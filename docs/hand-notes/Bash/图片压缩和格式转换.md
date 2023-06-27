---
layout: doc
---

# Bash 脚本记录

## 图片转为`webp`格式

找出指定文件夹下所有非`webp`格式的图片，并转换成`webp`

- 支持传入`单张图片地址/图片所在文件夹地址`
- 解决文件名称带空格问题[参考链接](https://www.cyberciti.biz/tips/handling-filenames-with-spaces-in-bash.html)
- `cwebp`[文档链接](https://developers.google.com/speed/webp/docs/cwebp?hl=zh-cn)

```shell
#! /bin/Bash
set -e;
read -p "是否删除原文件(y/n，默认n不删除): " isDeleteOriginalFile
dir=".";
if [ ! -z $1 ];
then
  dir="$1"
fi
# 如果传的是个非webp图片就直接压缩
if [ -f ${dir} ];then
  EXT=$(echo "${dir##*.}" | tr '[:upper:]' '[:lower:]')
  if [[ ${EXT} =~ ^(jpg|png|jpeg)$ ]];then
    FILENAME=$(basename "${dir}" ".${dir##*.}")
    DIRNAME=$(dirname "${dir}")
    echo "转换图片【${dir}】"
    cwebp -quiet ${dir} -o "${DIRNAME}/${FILENAME}.webp" 
    exit;
  else
    echo '该文件不用转换/不能被转换'
    exit;
  fi
fi

all_files=$(find $dir | egrep '\.(jpg|JPG|png|PNG|jpeg|JPEG)');
#all_files=$(find ${dir} -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) );
i=0
SAVEIFS=$IFS
IFS=$(echo -en "\n\b")
for FILE in ${all_files};
do
  FILENAME=$(basename "${FILE}" ".${FILE##*.}")
  DIRNAME=$(dirname "${FILE}")
  EXT="${FILE##*.}"
  if [[ ! ${EXT} =~ ^(webp|WEBP)$ ]];
    then
    ((i++))
    echo "转换第【${i}】个图片【${FILE}】"
    cwebp -quiet ${FILE} -o "${DIRNAME}/${FILENAME}.webp" 
    if [[ ! -z ${isDeleteOriginalFile} && ${isDeleteOriginalFile} = 'y' ]]
    then
    rm -rf ${FILE}
    fi
  fi
done
IFS=$SAVEIFS
```

## 图片压缩
::: tip
使用`shell`脚本，调用[tinypng](https://tinypng.com/)服务来进行图片压缩
:::

- 支持传入`单张图片地址/图片所在文件夹地址`
- `API_KEY`可以自己去[tinypng](https://tinypng.com/)生成一个，每月免费压缩`500`张图片

```shell
#!/bin/Bash
set -e

function compress_fn() {
  local file=$1
  local isDelOriginalFile=$2
  local FILENAME=$(basename "${file}" ".${file##*.}")
  local DIRNAME=$(dirname "${file}")
  local EXT=${file##*.}
  echo "上传【${file}】"
  output=$(curl https://api.tinify.com/shrink --user api:$API_KEY --data-binary @${file} -s | sed 's/"//g')
  output_url=$(echo $output | sed 's/.*url:\(.*\)}}.*/\1/g')
  save_url="${DIRNAME}/${FILENAME}_compress.${EXT}"
  if [[ ! -z ${isDelOriginalFile} && ${isDelOriginalFile} = 'y' ]];
  then
    save_url="${DIRNAME}/${FILENAME}.${EXT}"
    rm -rf ${file}
  fi
  echo "下载压缩后的图片【${save_url}】"
  curl $output_url --user api:$API_KEY --output ${save_url} -s
}
API_KEY=your_api_key
compress_dir="."
if [ ! -z $1 ]
  then
  compress_dir="$1"
fi
read -p "是否删除原文件(y/n，默认n不删除): " isDeleteOriginalFile
if [ -f ${compress_dir} ];then
  EXT=$(echo "${compress_dir##*.}" | tr '[:upper:]' '[:lower:]')
  if [[ ${EXT} =~ ^(jpg|png|jpeg|webp)$ ]];then
    compress_fn ${compress_dir} ${isDeleteOriginalFile};
    exit;
  else
    echo '该文件不是图片'
    exit;
  fi
fi


all_files=$(find ${compress_dir} | egrep '\.(jpg|JPG|jpeg|JPEG|png|PNG|webp|WEBP)')
SAVEIFS=$IFS
IFS=$(echo -en "\n\b")
for file in ${all_files}
do
  compress_fn ${file} ${isDeleteOriginalFile} &
done
IFS=${SAVEIFS}
wait
```
