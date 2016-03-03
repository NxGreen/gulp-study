# gulp-study
学习用gulp  构建简单的静态页面


###**简介**
       本项目主要用于记录学习gulp的过程。主要是内容是用gulp构建一个简单的静态页面。解决如下问题

 1. sass或者less的编译成css,以及css的自动添加前缀，合并和压缩。
 2. javascript文件的合并，压缩，混淆。
 3. 图片的压缩，优化。
 4. 开发中修改文件浏览器自动刷新无延迟


###**项目目录**
gulp-study/
├── dist            //gulp生成的目录
├── src             //开发目录
│   ├── css         
│   ├── font
│   ├── images
│   ├── js
│   │   └── libs
│   └── scss
├── gulpfile.js     //gulp配置文件
└── package.json  

![我的目录示例](https://github.com/NxGreen/gulp-study/blob/master/src/images/gulp_dir.png?raw=true)


###**使用**

```
git clone git@github.com:NxGreen/gulp-study.git
```

```
npm init
gulp //执行默认gulp任务-['copy','html','sass', 'css' ,'script', 'images']

```

gulpfile.js中有详细的注释。

###**我的疑问和备注**
 1. 使用gulp中如果所有的js(css)文件都打包成一个js(css)文件，必定会造成资源的浪费。
 2. 本项目并没有对html文档做处理，如果html中引用css、images、js位置层级，文件名发生变化，或许用gulp就很难处理。
 ![示例](https://github.com/NxGreen/gulp-study/blob/master/src/images/gulp_dir2.png?raw=true)

个人感觉用gulp很难解决如上问题，就算解决，也比较繁琐。

###**其他资料**
  [gulp资料集合](https://github.com/Platform-CUF/use-gulp)

###**建议留言**
本人菜鸟水平，以上文章如有错误的地方，还请指出。
如果有建议请点  **[这里](https://github.com/NxGreen/gulp-study/issues/new)**




    






