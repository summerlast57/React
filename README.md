# React

## 简介

React是用于构建用户界面的js库，是一个将数据渲染为HTML视图的开源js库。

**为什么学React？**

1. 原生js操作Dom频繁，效率低
2. 直接使用js操作Dom，会使浏览器进行大量重绘重排
3. 原生js没有组件化编程方案，代码复用低

---

## React入门

### 1.导入react核心库

先导入三个包（注意先后顺序，需先导入react.development.js，再导入react-dom.development.js）

创建一个容器，再创建虚拟Dom并渲染到容器中

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>创建虚拟dom</title>
</head>
<body>
  <div id="app"></div>
  <div id="text"></div>
  <!-- 引入react核心库 -->
  <script type="text/javascript" src="./js/react.development.js"></script>
  <!-- 引入react-dom，用于支持react操作dom -->
  <script type="text/javascript" src="./js/react-dom.development.js"></script>
  <!-- 引入babel，用于将jsx转换为js -->
  <script type="text/javascript" src="./js/babel.min.js"></script>

  <!-- 如果使用jsx语法，此处必须写text/babel -->
  <script type="text/babel">
    // 创建虚拟dom
    // 如果使用js创建虚拟dom，面对多层嵌套标签时，需要多次使用React.createElement，麻烦且杂乱
    // const vDom = React.createElement('h1',{id:'test'},React.createElement('span',{},'hello,react')
    const vDom = (
      <h1 id='text'>
        <span>hello,React</span>
        </h1>
    )
    // 渲染虚拟dom到页面
    ReactDOM.render(
      vDom,
      document.getElementById('app')
    )

    console.log('虚拟dom',vDom);
    console.log(typeof vDom);
    console.log(vDom.constructor === Object);
    const text = document.getElementById('text')
    console.log('真实dom',text);
    debugger
    console.log(typeof text);
    /*
      虚拟dom本质上是object对象
      虚拟dom的属性比真实dom的属性少，因为虚拟dom是react内部在使用，不需要真实dom那么多的属性
      虚拟dom最终会被react转换成真实dom渲染到页面上
    */
  </script>
</body>
</html>
```

---

### 2.jsx语法规则

jsx语法规则：

 1.定义虚拟dom时不能写引号

 2.标签时混入js语法要用{}

 3.样式的类名指定不要用class，因为class是es6中类的关键字/保留字，需要使用className

 4.内联样式要用style：{{key：value}}的方式去写，最外层{}表示混入js语法，里层{}表示对象

 5.只有一个根标签

 6.标签必须闭合

 7.若标签小写字母开头，则将该标签转换为html同名元素，找不到则会警告

 若大写字母开头，react就去渲染对应的组件，没有则报错

（关于js语句和表达式：表达式通常返回一个值，比如a，a+b，arr.map(),function(){},语句是一组指令或命令，用于执行某些操作，例如if(),for(),while(),switch()

```
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>创建虚拟dom</title>
</head>

<body>
  <div id="app"></div>
  <!-- 引入react核心库 -->
  <script type="text/javascript" src="./js/react.development.js"></script>
  <!-- 引入react-dom，用于支持react操作dom -->
  <script type="text/javascript" src="./js/react-dom.development.js"></script>
  <!-- 引入babel，用于将jsx转换为js -->
  <script type="text/javascript" src="./js/babel.min.js"></script>

  <!-- 如果使用jsx语法，此处必须写text/babel -->
  <script type="text/babel">
    const myData = {
      myId: 'example',
      message: 'hello,React'
    }
    // 创建虚拟dom
    const vDom = (
      <div>
        <h1 id={myData.myId.toLowerCase()} className='title'>
          <span style={{ color: 'red', fontSize: '10' }}>{myData.message.toLowerCase()}</span>
        </h1>
        <h1 id={myData.myId.toUpperCase()} className='title'>
          <span style={{ color: 'yellow', fontSize: '20' }}>{myData.message.toUpperCase()}</span>
        </h1>
        <input type="text" />
      </div>
    )
    // 渲染虚拟dom到页面
    ReactDOM.render(
      vDom,
      document.getElementById('app')
    )

    /*
      jsx语法规则：
        1.定义虚拟dom时不能写引号
        2.标签时混入js语法要用{}
        3.样式的类名指定不要用class，因为class是es6中类的关键字/保留字，需要使用className
        4.内联样式要用style：{{key：value}}的方式去写，最外层{}表示混入js语法，里层{}表示对象
        5.只有一个根标签
        6.标签必须闭合
        7.若标签小写字母开头，则将该标签转换为html同名元素，找不到则会警告
        若大写字母开头，react就去渲染对应的组件，没有则报错
    */
  </script>
</body>

</html>
```

---

### 3.组件

#### 3.1 函数式组件

适用于简单组件的定义，组件内部的this指向为undefined，因为babel编译后开启了严格模式

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>函数式组件</title>
</head>
<body>
  <div id="app"></div>

  <script type="text/javascript" src="../js/react.development.js"></script>
  <script type="text/javascript" src="../js/react-dom.development.js"></script>
  <script type="text/javascript" src="../js/babel.min.js"></script>

  <script type="text/babel">
    // 创建函数式组件
    function Demo(){
      console.log(this);//此处的this是undefined，因为babel编译后开启了严格模式
      return <h1>我是函数式组件（适用于简单组件的定义</h1>
    }
    ReactDOM.render(<Demo/>,document.getElementById('app'))
    /* 
      执行了ReactDOM.render（）发生了什么
      1、React解析组件标签，找到了Demo组件
      2、发现组件是用函数定义的，随后调用该函数，将返回的虚拟dom转为真实dom，随后呈现再页面上
    */
  </script>
</body>
</html>
```

---

#### 3.2 类式组件

类式组件必须继承React.Component，通过render函数返回要渲染的React元素

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>类式组件</title>
</head>
<body>
  <div id="app"></div>

  <script type="text/javascript" src="../js/react.development.js"></script>
  <script type="text/javascript" src="../js/react-dom.development.js"></script>
  <script type="text/javascript" src="../js/babel.min.js"></script>

  <script type="text/babel">
    // 创建类式组件
    class MyComponent extends React.Component{
      render(){
        //render是放在哪里的？——MyComponent的实例对象上，供实例使用
        //render中的this指向？——MyComponent的实例对象  = MyComponent组件实例对象
        console.log('render中的this：',this);
        return <h1>我是类定义的组件（适用于复杂组件）</h1>
      }
    }
    ReactDOM.render(<MyComponent/>,document.getElementById('app'))
    /* 
      执行了ReactDOM.render(<MyComponent/>,document.getElementById('app'))发生了什么
      1、React解析组件标签，找到了MyComponent组件
      2、发现组件是用类定义的，随后new出来该类的实例，并通过该实例调用到原型上的render方法
      3.将render返回的虚拟dom转为真实dom，随后呈现再页面上
    */
  </script>
</body>
</html>
```

---

#### 3.3 组件实例的三大属性：state

我们都说React是一个状态机，体现是什么地方呢，就是体现在state上，通过与用户的交互，实现不同的状态，然后去渲染UI,这样就让用户的数据和界面保持一致了。state是组件的私有属性。

在React中，更新组件的state，结果就会重新渲染用户界面(不需要操作DOM),一句话就是说，用户的界面会随着状态的改变而改变。

state是组件对象最重要的属性，值是对象（可以包含多个key-value的组合）

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>组件中的三大属性</title>
</head>
<body>
  <div id="app"></div>

  <script type="text/javascript" src="../js/react.development.js"></script>
  <script type="text/javascript" src="../js/react-dom.development.js"></script>
  <script type="text/javascript" src="../js/babel.min.js"></script>

  <script type="text/babel">
    // 创建类式组件
    class Weather extends React.Component{

      // 构造器调用几次？—— 1次
      constructor(props){
        super(props)
        // 初始化状态
        this.state = {isHot:true,wind:'微风'}
        // 解决changeWeather中的this指向问题
        this.changeWeather = this.changeWeather.bind(this)
      }

      // render调用几次？——1+n次，1是初始化的那次，n是状态更新的次数
      render(){
        // 事件名需要将onclick改为onClick
        return <h1 onClick={this.changeWeather}>今天天气{this.state.isHot?'炎热':'凉爽'}，{this.state.wind}</h1>
      }

      // changeWeather调用几次？—— 事件触发多少次调用多少次
      changeWeather(){
        // changeWeather放在那里？——Weather的原型对象上，供实例使用
        // 由于changeWeather是作为onClick的回调，所以不是通过实例调用的，是直接调用
        // 类中的方法默认开启了局部严格模式，所以changeWeather的this是undefined

        // 严重注意：状态（state）不可直接更改，必须通过React中内置的一个API即setState进行更新
        // 且更新是一种合并，不是替换
        const isHot = this.state.isHot
        this.setState({isHot:!isHot})
        console.log(this.state.isHot);
      }
    }
    ReactDOM.render(<Weather/>,document.getElementById('app'))

  </script>
</body>
</html>
```

需要注意的是：

1.组件的构造函数，必须接收props参数并传递给super

2.特别关注this【重点】，类中所有的方法局部都开启了严格模式，如果直接进行调用，this就是undefined

3.想要改变state,需要使用setState进行修改，如果只是修改state的部分属性，则不会影响其他的属性，这个只是合并并不是覆盖。

this.setState()，该方法接收两种参数：对象或函数。

1. 对象：即想要修改的state
2. 函数：接收两个函数，第一个函数接受两个参数，第一个是当前state，第二个是当前props，该函数返回一个对象，和直接传递对象参数是一样的，就是要修改的state；第二个函数参数是state改变后触发的回调



**state的简写写法（主流写法）**

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>state简写</title>
</head>
<body>
  <div id="app"></div>

  <script type="text/javascript" src="../js/react.development.js"></script>
  <script type="text/javascript" src="../js/react-dom.development.js"></script>
  <script type="text/javascript" src="../js/babel.min.js"></script>

  <script type="text/babel">
    // 创建类式组件
    class Weather extends React.Component{
      // 初始化状态
      state = {isHot:true,wind:'微风'}

      render(){
        return <h1 onClick={this.changeWeather}>今天天气{this.state.isHot?'炎热':'凉爽'},{this.state.wind}</h1>
      }
      // 自定义方法——>要用赋值语句的形式+箭头函数
      changeWeather = () =>{
        // 箭头函数内this指向外层this————Weather实例对象
        const isHot = this.state.isHot
        this.setState({isHot:!isHot})
      }
    }
    ReactDOM.render(<Weather/>,document.getElementById('app'))

  </script>
</body>
</html>
```

---

#### 3.4 组件实例的三大属性：props

Props主要用来传递数据，比如组件之间进行传值

示例：

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>组件实例三大属性-props</title>
</head>
<body>
  <div id="test1"></div>
  <div id="test2"></div>

  <script type="text/javascript" src="../js/react.development.js"></script>
  <script type="text/javascript" src="../js/react-dom.development.js"></script>
  <script type="text/javascript" src="../js/babel.min.js"></script>
  <!-- 引入prop-type.js，用于对组件标签属性进行限制 -->
  <script type="text/javascript" src="../js/prop-types.js"></script>

  <script type="text/babel">
    // 创建类式组件
    class Person extends React.Component{
      render(){
        const {name,age,sex} = this.props
        return (
          <ul>
            <li>姓名：{name}</li>
            <li>性别：{age+1}</li>
            <li>年龄：{sex}</li>
          </ul>
        )
      }
    }
    // 对标签属性进行限制，必要性的限制
    Person.protoTypes={
      name:PropTypes.string.isRequired, //限制name必传，且为字符串
      age:PropTypes.number,  //限制age为数字
      sex:PropTypes.string, //限制sex为字符串
      speak:PropTypes.func  //限制为函数
    }
    // 指定标签默认属性值
    Person.defaultProps={
      sex:'boy',  //默认值为boy
      age:18  //默认值为18
    }
    ReactDOM.render(<Person name='tom' age={18} sex='boy'/>,document.getElementById('test1'))

    const p = {name:'jack',age:20,sex:'girl'}
    // {...p}可以将对象展开，但该语法仅能在组件中使用，其他地方使用会报错
    ReactDOM.render(<Person {...p} speak={speak}/>,document.getElementById('test2'))

    function speak(){
      console.log('lalalala');
    }
  </script>
</body>
</html>
```

在此示例中，通过给组件添加属性的方法传值，这些属性都会在组件实例对象的props属性上，在进行传值的时候，需要注意传值类型，若是字符串类型，则加引号，若为数字类型，则加{}，**为了更好的限制标签属性的类型，引入了prop-type.js**，通过给类添加**protoTypes，defaultProps**属性来限制**属性类型和必要性以及默认值**。

**同时，我们可以注意到可以通过{...p}的方式来展开对象，但实际上，展开运算符并不能展开一个对象，在此处是因为babel和react结合使得{...p}可以展开对象，但也仅限在标签中。**



**props简写**

```
  <script type="text/babel">
    // 创建类式组件
    class Person extends React.Component{
      constructor(props){
        // 构造器是否接收props，是否传递给super，取决于：是否希望在构造器中通过this访问props
        super(props)
        console.log(this.props);
      }

      // 对标签属性进行限制，必要性的限制
      static protoTypes={
        name:PropTypes.string.isRequired, //限制name必传，且为字符串
        age:PropTypes.number,  //限制age为数字
        sex:PropTypes.string, //限制sex为字符串
      }
      // 指定标签默认属性值
      static defaultProps={
        sex:'boy',  //默认值为boy
        age:18  //默认值为18
      }
      render(){
        const {name,age,sex} = this.props
        return (
          <ul>
            <li>姓名：{name}</li>
            <li>性别：{age+1}</li>
            <li>年龄：{sex}</li>
          </ul>
        )
      }
    }
    
    ReactDOM.render(<Person name='tom'/>,document.getElementById('test1'))
  </script>
```

**函数式组件使用props**：通过传入props参数就可以使用props了

```
  <script type="text/babel">
    // 创建函数式组件
    function Person(props) {
      const { name, age, sex } = props
      return (
        <ul>
          <li>姓名：{name}</li>
          <li>性别：{age + 1}</li>
          <li>年龄：{sex}</li>
        </ul>
      )
    }
    ReactDOM.render(<Person name='tom' />, document.getElementById('test1'))
  </script>
</body>

</html>
```

----

#### 3.5 Refs

Refs 提供了一种方式，允许我们访问 DOM 节点或在 render 方法中创建的 React 元素。

**1.字符串形式**

在想要获取到一个DOM节点，可以直接在这个节点上添加ref属性。利用该属性进行获取该节点的值。

```
  <script type="text/babel">
    // 创建类式组件
    class Demo extends React.Component {
      // 使用字符串形式的ref已过时了，因为其效率较低，在未来可能会被移除，

      showData1 = () => {
        console.log(this.refs);
        const { input1 } = this.refs
        alert(input1.value)
      }
      showData2 = () => {
        const { input2 } = this.refs
        alert(input2.value)
      }
      render() {
        const { name, age, sex } = this.props
        return (
          <div>
            <input ref='input1' type="text" placeholder='点击按钮输出内容' />&nbsp;
            <button onClick={this.showData1}>点击输出左侧的数据</button>&nbsp;&nbsp;&nbsp;
            <input ref='input2' onBlur={this.showData2} type="text" placeholder='失去焦点输出内容' />
          </div>
        )
      }
    }

    ReactDOM.render(<Demo />, document.getElementById('test1'))
  </script>
```

**2.回调形式**

回调形式会在ref属性中添加一个回调函数。将该DOM作为参数传递过去。

需要注意的是若是内联函数，当状态更新时，回调函数会执行两次，第一次传入参数为null，第二次传入参数为渲染的Dom元素

```
  <script type="text/babel">
    // 创建类式组件
    class Demo extends React.Component {
      state = {isHot:true}
      changeWeather =()=>{
        const isHot = this.state.isHot
        this.setState({isHot:!isHot})
      }
      showData1 = () => {
        const { input1 } = this
        alert(input1.value)
      }
      showData2 = () => {
        const { input2 } = this
        alert(input2.value)
      }
      alertData = (c)=>{
        this.input1 = c;
        console.log("@",c);
      }
      render() {
        const { name, age, sex } = this.props
        return (
          <div>
            <h2>今天天气{this.state.isHot?'炎热':'凉爽'}</h2>
            {/*<input ref={(c)=>{this.input1 = c;console.log("@",c);}} type="text" placeholder='点击按钮输出内容' />&nbsp;*/}
            <input ref={this.alertData} type="text" placeholder='点击按钮输出内容' />&nbsp;
            <button onClick={this.showData1}>点击输出数据</button>&nbsp;
            <button onClick={this.changeWeather}>修改天气</button>
          </div>
        )
      }
    }

    ReactDOM.render(<Demo />, document.getElementById('test1'))
    /* 
      使用内联回调函数时，当状态更新时，其内联函数会执行两次，第一次传入参数为null，第二次传入参数为Dom元素
     */
  </script>
```

**3.API形式**

React其实已经给我们提供了一个相应的API，他会自动的将该DOM元素放入实例对象中

通过API，创建React的容器，相当于省略了回调的中间环节。但是这个容器是专门专用的，所以每一个ref都需要创建这个。该API会将DOM元素赋值给实例对象的名称为容器名称的属性的current【这个current是固定的】

```
  <script type="text/babel">
    // 创建类式组件
    class Demo extends React.Component {
      // React,createRef()是专人专用的，每一个标签只能有对应的一个ref，若ref相同，后面的会覆盖前面的
      myRef = React.createRef()
      myRef2 = React.createRef()
      showData1 = () => {
        console.log(this.myRef2);
        alert(this.myRef.current.value)
      }
      render() {
        const { name, age, sex } = this.props
        return (
          <div>
            <input ref={this.myRef} type="text" placeholder='点击按钮输出内容' />&nbsp;
            <button ref={this.myRef2} onClick={this.showData1}>点击输出数据</button>&nbsp;
          </div>
        )
      }
    }
    ReactDOM.render(<Demo />, document.getElementById('test1'))
  </script>
```

**官方提示我们不要过度的使用ref，如果发生时间的元素刚好是需要操作的元素，就可以使用事件去替代。**

----

### 4.事件处理

React的事件是通过onXxx属性指定事件处理函数

​    React使用的都是自定义的事件，而不是原生的事件——为了更好的兼容性

​    React中的事件是通过事件委托方式处理的

​    事件中必须返回的是函数

​    通过event.target得到发生事件的Dom元素对象——尽量避免使用ref，当操作的dom元素和发生事件的dom元素相同时

```
<script type="text/babel">
    // 创建类式组件
    class Demo extends React.Component {
      myRef = React.createRef()
      // 显示左侧数据
      showData1 = () => {
        alert(this.myRef.current.value)
      }
      // 显示右侧数据
      showData2 = (event) => {
        alert(event.target.value)
      }
      render() {
        return (
          <div>
            <input ref={this.myRef} type="text" placeholder='点击按钮输出内容' />&nbsp;
            <button onClick={this.showData1}>点击输出数据</button>&nbsp;
            <input ref={this.myRef2} onBlur={this.showData2} type="text" />
          </div>
        )
      }
    }
    ReactDOM.render(<Demo />, document.getElementById('test1'))
  </script>
```

---

### 5-收集表单数据

#### 5.1 非受控组件

​     表单元素的值不受组件state控制，直接从DOM获取。

​     使用ref来获取表单元素的值。 

```
class Login extends React.Component {
  handleSubmit = (event)=>{
    // 阻止表单提交
    event.preventDefault()
    const {username,password} = this
    alert(`用户名是：${username.value}，密码是：${password.value}`)
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        用户名：<input ref={c=>this.username = c} type="text" name='username'/>
        密码：<input ref={c=>this.password = c} type="password" name='password'/>
      <button>登录</button>
    </form>
  		)
  	}
  }
```

#### 5.2 受控组件

其表单元素的值由React组件的state来控制。当用户与表单元素交互时，相应的state会更新，从而更新UI

```
<script type="text/babel">
    // 创建类式组件
    class Login extends React.Component {
      /* 受控组件：其表单元素的值由React组件的state来控制。当用户与表单元素交互时，相应的state会更新，从而更新UI。 */

      // 初始化状态
      state = {
        username:'',
        password:''
      }
      saveUsername = (event) =>{
        this.setState({username:event.target.value})
      }
      savePassword = (event) =>{
        this.setState({password:event.target.value})
      }
      handleSubmit = (event)=>{
        // 阻止表单提交
        event.preventDefault()
        const {username,password} = this.state
        alert(`用户名是：${username}，密码是：${password}`)
      }
      render() {
        return (
          <form onSubmit={this.handleSubmit}>
            用户名：<input onChange={this.saveUsername} type="text" name='username'/>
            密码：<input onChange={this.savePassword} type="password" name='password'/>
            <button>登录</button>
          </form>
        )
      }
    }
    ReactDOM.render(<Login />, document.getElementById('test1'))
  </script>
```

----

### 6.组件的生命周期

#### 6.1 生命周期钩子函数-旧（16.0）

组件从创建到死亡，会经过一些特定的阶段

 React组件中包含一系列钩子函数{生命周期回调函数}，会在特定的时刻调用

 我们在定义组件的时候，会在特定的声明周期回调函数中，做特定的工作

下面是旧生命周期的结构图：

![image-20240322215338092](https://cdn.jsdelivr.net/gh/summerlast57/TyporaPicture@main/picture/202404022023861.png)

```
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>生命周期钩子函数-旧</title>
</head>

<body>
  <div id="test"></div>

  <script type="text/javascript" src="../js/react.development.js"></script>
  <script type="text/javascript" src="../js/react-dom.development.js"></script>
  <script type="text/javascript" src="../js/babel.min.js"></script>
  <!-- 引入prop-type.js，用于对组件标签属性进行限制 -->
  <script type="text/javascript" src="../js/prop-types.js"></script>

  <script type="text/babel">

    class Count extends React.Component {
      // 构造器
      constructor(props) {
        super(props)
        console.log('Count---constructor');
        this.state = {count:0}
      }
      // 加1按钮的回调
      addCount = ()=>{
        this.setState({count:this.state.count+1})
      }

      // 卸载组件按钮的回调
      death = ()=>{
        ReactDOM.unmountComponentAtNode(document.getElementById('test'))
      }
      
      // 强制更新按钮的回调
      force = ()=>{
        // forceUpdate()会跳过shouldComponentUpdate钩子
        this.forceUpdate()
      }

      // 组件将要挂载的钩子
      componentWillMount() {
        console.log('Count---componentWillMount');
      }
      
      // 组件挂载完毕的钩子
      componentDidMount(){
        console.log('Count---componentDidMount');
      }
      
      // 组件将要卸载的钩子
      componentWillUnmount(){
        console.log('Count---componentWillUnmount');
      }
      
      // 控制组件更新的阀门：通过setState更新状态时，由该钩子函数判断是否可以更新
      // 函数要求必须返回布尔值，若为true则可以更新，为false则不行。该函数可以不写，React会默认返回true
      shouldComponentUpdate(){
        console.log('Count---shouldComponentUpdate');
        return true
      }
      
      // 组件将要更新的钩子
      componentWillUpdate(){
        console.log('Count---componentWillUpdate');
      }
      
      // 组件更新完毕的钩子
      componentDidUpdate(){
        console.log('Count---componentDidUpdate');
      }
      
      // 初始化执行一次，状态更新几次就执行几次
      render() {
        console.log('Count---render');
        return (
          <div>
            <h2>count值为：{this.state.count}</h2>
            <button onClick={this.addCount}>加1</button>
            <button onClick={this.death}>卸载组件</button>
            <button onClick={this.force}>不更改任何状态中数据，强制更新</button>
          </div>
        )
      }
      
    }
    
    class A extends React.Component {

      state = {carName:'奔驰'}

      changeCar = ()=>{
        this.setState({carName:'AE86'})
      }
      render(){
        return (
          <div>
            <h2>我是A组件</h2>
            <button onClick={this.changeCar}>换车</button>
            <B carName={this.state.carName}/>
          </div>
        )
      }
    }

    class B extends React.Component {
      componentDidMount(){
        console.log('B---componentDidMount');
      }
      // 组件初始化的时候不会执行，当接收新的props时才会调用
      componentWillReceiveProps(){
        console.log('B---componentWillReceiveProps');
      }
      render(){
        return (
          <div>
            <h2>我是B组件的内容:{this.props.carName}</h2>
          </div>
        )
      }
    }
    
    // 渲染虚拟Dom到页面
    ReactDOM.render(<A/>,document.getElementById('test'))
  </script>
</body>

</html>
```

---

#### 6.2 生命周期钩子函数-新（17.0及以上）

在最新的react版本中，有些生命周期钩子被抛弃了，在官网中是这样说的：

我们得到最重要的经验是，过时的组件生命周期往往会带来不安全的编码实践，具体函数如下：

- `componentWillMount`
- `componentWillReceiveProps`
- `componentWillUpdate`

这些生命周期方法经常被误解和滥用；此外，我们预计，在异步渲染中，它们潜在的误用问题可能更大。我们将在即将发布的版本中为这些生命周期添加 “UNSAFE_” 前缀。（这里的 “unsafe” 不是指安全性，而是表示使用这些生命周期的代码在 React 的未来版本中更有可能出现 bug，尤其是在启用异步渲染之后。）

由此可见，新版本中并不推荐持有这三个函数，取而代之的是带有UNSAFE_ 前缀的三个函数，比如: UNSAFE_ componentWillMount。即便如此，其实React官方还是不推荐大家去使用，在以后版本中有可能会去除这几个函数。

下面是新生命周期的结构：

![image-20240322215553216](https://cdn.jsdelivr.net/gh/summerlast57/TyporaPicture@main/picture/202404022029499.png)

从图上可以看出，新生命周期和旧生命周期的区别主要有：

1.抛弃了上面所说的三个钩子函数【其实还可以使用】

2.新添加了两个钩子函数

现在重点说一下，新添加的钩子函数

**static getDerivedStateFromProps(props, state)**

首先，该函数会在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用；该函数必须是静态的；给组件传递的数据（props）以及组件状态（state），会作为参数到这个函数中；该函数也必须有返回值，返回一个Null或者state对象。因为初始化和后续更新都会执行这个方法，因此在这个方法返回state对象，就相当于将原来的state进行了覆盖，所以修改状态不起作用。

**getSnapshotBeforeUpdate(prevProps, prevState)**

`getSnapshotBeforeUpdate()` 在最近一次渲染输出（提交到 DOM 节点）之前调用。它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）。此生命周期的任何返回值将作为参数传递`componentDidUpdate()`。

```
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>生命周期钩子函数-新</title>
</head>

<body>
  <div id="test"></div>

  <script type="text/javascript" src="../js/17.0/react.development.js"></script>
  <script type="text/javascript" src="../js/17.0/react-dom.development.js"></script>
  <script type="text/javascript" src="../js/babel.min.js"></script>
  <!-- 引入prop-type.js，用于对组件标签属性进行限制 -->
  <script type="text/javascript" src="../js/17.0/prop-types .js"></script>

  <script type="text/babel">

    class A extends React.Component {

      constructor(props) {
        console.log("A --- constructor")
        super(props);
        this.state = { num: 1 }
      }

      add = () => {
        let { num } = this.state;
        this.setState({ num: num + 1 });
        //强制更新
        //this.forceUpdate();
      }

      render() {
        console.log("A --- render");
        return (
          <div>
            <h1>这个是第{this.state.num}个</h1>

            <button onClick={this.add}>点击加一</button>
          </div>
        )
      }

      //必须是静态的
      //必须有返回值（Null或者state对象）
      //如果返回的是state对象，里面的将会对原有的state进行覆盖，并且不能修改【因为初始化，更新都会经过这个函数】
      //给组件传递的参数，可以作为该方法的参数传递过来。因此可以让该参数作为state。
      //也可以以props和state作为参数进行传递
      static getDerivedStateFromProps(props) {
        console.log("A --- getDerivedStateFromProps", props);
        return null;
      }

      //更新的时候调用，在render和componentDidUpdate之间
      //必须返回一个快照
      getSnapshotBeforeUpdate() {
        console.log("A --- getSnapshotBeforeUpdate");
        return null;
      }

      //在render之后执行
      componentDidMount() {
        console.log("A --- componenetDidMount");
      }

      //更新操作 setState之后执行，判断是否可以更新（true可以，false不可以）
      shouldComponentUpdate() {
        console.log("A --- shouldComponentUpdate");
        return true;
      }

      //组件更新之后
      componentDidUpdate() {
        console.log("A --- componentDidUpdate");
      }

      //卸载组件之后
      componentWillUnmonut() {
        console.log("A --- componentWillUnmonut");
      }

    }

    ReactDOM.render(<A />, document.getElementById("test"));
  </script>
</body>

</html>
```

---

### 7.DOM中的diffing算法

提到这个算法，就必须说一下关于Key的事情了。

其实每个组件中的每个标签都会有一个key,只不过有的必须显示的指定，有的可以隐藏。

如果生成的render出来后就不会改变里面的内容，那么你不需要指定key（不指定key时，React也会生成一个默认的标识）,或者将index作为key，只要key不重复即可。

但是如果你的标签是动态的，是有可能刷新的，就必须显示的指定key。

**用index作为key可能会引发的问题:**

1。若对数据进行:逆序添加、逆序删除等破坏顺序操作:

 会产生没有必要的真实DOM更新 界面效果没问题,但效率低。

2．如果结构中还包含输入类的DOM:

 会产生错误DOM更新 界面有问题。

3，注意! 如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表用于展示，使用index作为key是没有问题的。

**开发如何选择key?**

最好使用每一条数据的唯一标识作为key 比如id，手机号，身份证号

如果确定只是简单的展示数据，用Index也是可以的

**而这个判断key的比较规则就是Diff算法**

Diff算法其实就是react生成的新虚拟DOM和以前的旧虚拟DOM的比较规则：

- 如果旧的虚拟DOM中找到了与新虚拟DOM相同的key:
  - 如果内容没有变化，就直接只用之前旧的真实DOM
  - 如果内容发生了变化，就生成新的真实DOM
- 如果旧的虚拟DOM中没有找到了与新虚拟DOM相同的key:
  - 根据数据创建新的真实的DOM,随后渲染到页面上

```
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>diffing算法中key的作用</title>
</head>

<body>
  <div id="test"></div>

  <script type="text/javascript" src="../js/17.0/react.development.js"></script>
  <script type="text/javascript" src="../js/17.0/react-dom.development.js"></script>
  <script type="text/javascript" src="../js/babel.min.js"></script>
  <!-- 引入prop-type.js，用于对组件标签属性进行限制 -->
  <script type="text/javascript" src="../js/17.0/prop-types .js"></script>

  <script type="text/babel">
    class Person extends React.Component {
      state = {
        persons: [
          { id: 1, name: '小李', age: 20 },
          { id: 2, name: '小红', age: 30 },
          { id: 3, name: '小张', age: 18 },
        ]
      }
      add = ()=>{
        const {persons} = this.state
        const p = {id:this.state.persons.length+1,name:'小王',age:22}
        this.setState({persons:[p,...persons]})
      }
      render() {
        return (
          <div>
            <h2>使用index作为key</h2>
            <button onClick={this.add}>添加一个小王</button>
            <ul>
              {
                this.state.persons.map((item, index) => {
                  return <li key={index}>{item.name}-----{item.age}  <input type="text" /></li>
                })
              }
            </ul>
            <hr />
            <hr />
            <h2>使用id唯一标识作为key</h2>
            <ul>
              {
                this.state.persons.map((item) => {
                  return <li key={item.id}>{item.name}-----{item.age}  <input type="text" /></li>
                })
              }
            </ul>
          </div>
        )
      }
    }
    ReactDOM.render(<Person />, document.getElementById('test'))
  </script>
</body>

</html>
```





---

## React应用（基于脚手架）

### 1.基于脚手架创建react项目

react提供了一个用于创建react项目的脚手架库：create-react-app

全局安装create-react-app：

```
npm install create-react-app -g
```

**特殊情况1：**

在安装create-react-app时发现报错`npm ERR! request to https://registry.npm.taobao.org/create-react-app failed, reason: certificate has expired`,其实是淘宝镜像过期了。

解决办法：

1. 查看当前的npm镜像：`npm config list`

![image-20240323150038789](https://cdn.jsdelivr.net/gh/summerlast57/TyporaPicture@main/picture/202404022032362.png)

2. 清空缓存：`npm cache clean --force`
3. 然后修改镜像即可：`npm config set registry https://registry.npmmirror.com`

**特殊情况2：**

在使用create-react-app hello-react创建react项目时，报错`create-react-app : 无法加载文件 C:\Program Files\nodejs\node_global\create-react-app.ps1，因为在此系统上禁止运行脚本。有关详细信息，请参阅 https:/ go.microsoft.com/fwlink/?LinkID=135170 中的 about_Execution_Policies。`

解决办法：

1. 打开powershell作为管理员
2. 运行以下命令来更改执行策略`Set-ExecutionPolicy RemoteSigned`
3. 在确认提示中输入 `Y` 来确认更改策略。



---

### 2.项目的目录结构

我们来看一下public这个目录下面的结构

![image-20240323153646783](https://cdn.jsdelivr.net/gh/summerlast57/TyporaPicture@main/picture/202404022032632.png)

这里面最主要的还是这个Index.html文件：

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <!--%PUBLIC_URL%表示public文件夹的路径-->
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <!--用于开启理想视口，用于移动端页面的适配-->
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <!--用于配置浏览器地址栏的颜色（仅支持安卓手机浏览器）-->
    <meta name="theme-color" content="#000000" />
    <!--描述网页信息的-->
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <!--用于指定网页添加到手机主屏幕后的图标（仅仅支持ios）-->
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <!-- 应用加壳时候的配置文件 -->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />

    <title>React App</title>
  </head>
  <body>
    <!-- 浏览器不支持js运行时展现的文本 -->
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>

  </body>
</html>

```

src目录：

![image-20240323153618208](https://cdn.jsdelivr.net/gh/summerlast57/TyporaPicture@main/picture/202404022032155.png)

这里面其实最主要的就是App.js以及index.js，一个是组件，一个是将组件渲染到页面中的。



---

### 3.样式模块化

当组件逐渐增多起来的时候，我们发现，组件的样式也是越来越丰富，这样就很有可能产生两个组件中样式名称有可能会冲突，这样会根据引入App这个组件的先后顺序，后面的会覆盖前面的，

为了避免这样的样式冲突，我们采用下面的形式：

1.将css文件名修改： hello.css --- >hello.module.css

2.引入并使用的时候改变方式：

```
import  React,{ Component } from "react"
import hello from './index.module.css'

export default class Hello extends Component{
  render(){
    return (
      <h2 className={hello.title}>Hello,React</h2>
    )
  }
}
```



---

### 4.功能界面的组件化编码流程

1.拆分组件:拆分界面，抽取组件

2.实现静态组件

3.实现动态组件

- 动态的显示初始化数据
  - 数据类型
  - 数据名称
  - 保存在哪个组件
- 交互

**注意事项：**

1.拆分组件、实现静态组件。注意className、style的写法

2.动态初始化列表，如何确定将数据放在哪个组件的state中？

- 某个组件使用：放在自身的state中
- 某些组件使用：放在他们共同的父组件中【状态提升】

3.关于父子组件之间的通信

- 父组件给子组件传递数据：通过props传递
- 子组件给父组件传递数据：通过props传递，要求父组件提前给子组件传递一个函数

4.注意defaultChecked 和checked区别，defalutChecked只是在初始化的时候执行一次，checked没有这个限制，但是必须添加onChange方法类似的还有：defaultValue 和value

5.状态在哪里，操作状态的方法就在哪里



---

### 5. react ajax

React本身只关注与页面，并不包含发送ajax请求的代码，所以一般都是集成第三方的一些库，或者自己进行封装。

推荐使用axios。

在使用的过程中很有可能会出现跨域的问题，这样就应该配置代理。

所谓同源（即指在同一个域）就是两个页面具有相同的协议（protocol），主机（host）和端口号（port）， 当一个请求url的**协议、域名、端口**三者之间任意一个与当前页面url不同即为跨域 。

那么react通过代理解决跨域问题呢

**方法一**

> 在package.json中追加如下配置

```
"proxy":"请求的地址"      "proxy":"http://localhost:5000"  
```

说明：

1. 优点：配置简单，前端请求资源时可以不加任何前缀。
2. 缺点：不能配置多个代理。
3. 工作方式：上述方式配置代理，当请求了3000不存在的资源时，那么该请求会转发给5000 （优先匹配前端资源）

**方法二**

1. 第一步：创建代理配置文件

   ```
   在src下创建配置文件：src/setupProxy.js
   ```

2. 编写setupProxy.js配置具体代理规则：

   ```
   const proxy = require('http-proxy-middleware')
   
   module.exports = function(app) {
     app.use(
       proxy('/api1', {  //api1是需要转发的请求(所有带有/api1前缀的请求都会转发给5000)
         target: 'http://localhost:5000', //配置转发目标地址(能返回数据的服务器地址)
         changeOrigin: true, //控制服务器接收到的请求头中host字段的值
         /*
         	changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
         	changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:3000
         	changeOrigin默认值为false，但我们一般将changeOrigin值设为true
         */
         pathRewrite: {'^/api1': ''} //去除请求前缀，保证交给后台服务器的是正常请求地址(必须配置)
       }),
       proxy('/api2', { 
         target: 'http://localhost:5001',
         changeOrigin: true,
         pathRewrite: {'^/api2': ''}
       })
     )
   }
   ```

   说明：

   1. 优点：可以配置多个代理，可以灵活的控制请求是否走代理。
   2. 缺点：配置繁琐，前端请求资源时必须加前缀。

**注意：在18.2版本中，需改写为以下形式，否则将无法访问**

```
const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(
    createProxyMiddleware('/api1', {  //api1是需要转发的请求(所有带有/api1前缀的请求都会转发给5000)
      target: 'http://localhost:5000', //配置转发目标地址(能返回数据的服务器地址)
      changeOrigin: true, //控制服务器接收到的请求头中host字段的值
      pathRewrite: {'^/api1': ''} //去除请求前缀，保证交给后台服务器的是正常请求地址(必须配置)
    }),
  )
}
```

​	

---

### 6.发布订阅模式

举个例子来说就是张三想要跟李四进行通信，张三就需要订阅一个消息【比如A消息】，李四想要给张三数据，就必须发布一个A消息，在发布的同时将数据放入消息中，因为张三订阅了名称为A的消息，此时就能接受到李四发布的消息，从而获取到数据。

这就有点类似于看报纸，甲想要知道每天都发生什么事情，于是订阅了每天日报，乙每天都会发布这个每天日报，因为甲订阅了，于是乙就会每天就给甲方推送，甲方从而获取数据。

**在消息订阅和发布中，我们可以使用PubSubJs进行通信：**

安装PubSubJs

```
npm i pubsub-js
```

引入PubSubJs

```
import PubSub from 'pubsub-js'
```

订阅消息

```
PubSub.subscribe("getSate",(_,data)=>{
            console.log(data)
        })
PubSub.subscribe("订阅的消息名称",回调函数，第一个参数是消息名称，可以使用_来占位，第二个是传递的数据
        })
```

发布消息

```
PubSub.publish("getSate",{isFrist:false,isLoad:true})
PubSub.publish("订阅的消息名称",传递的数据)
```



---

### 7.async和await以及fetch

**async:**

该关键字是放在函数之前的，使得函数成为一个异步函数，他最大的特点就是将函数回封装成Promise，也就是被他修饰的函数的返回值都是Promise对象。而这个Promise对象的状态则是由函数执行的返回值决定的。

如果返回的是一个非promise对象，该函数将返回一个成功的Promise，成功的值则是返回的值；

如果返回的是一个promise对象，则该函数返回的就是该promise对应的状态。

**await**

await右边是一个表达式，如果该表达式返回的是一个Promise对象，则左边接收的结果就是该Promise对象成功的结果，如果该Promise对象失败了，就必须使用try..catch来捕获。如果该表达式返回的是是一个不是promise对象，则左边接受的就是该表达式的返回值。

当 [await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await) 关键字与异步函数一起使用时，它的真正优势就变得明显了 —— 事实上， **await 只在异步函数里面才起作用**。它可以放在任何异步的，基于 promise 的函数之前。它会暂停代码在该行上，直到 promise 完成，然后返回结果值。在暂停的同时，其他正在等待执行的代码就有机会执行了。

举例：

```
 f1 = () =>{
        return new Promise((resolve,reject)=>{
            // resolve(1);
            reject("错误")
        })
    }

    async function test(){
        try{
           const p =  await f1();
           console.log(p)
        }catch(error){
            console.error(error)
        }
    }
    test();
```

**fetch**

以前发送请求，使用ajax或者axios，现在还可以使用fetch。这个是window自带的，和xhr是一个级别的。

可以查看这个文章，写的真的不错：

[fetch](http://www.ruanyifeng.com/blog/2020/12/fetch-tutorial.html)





---

## React 路由

### 1. SPA

单页Web应用(single page web application，SPA)。整个应用只有一个完整的页面。

点击页面中的链接不会刷新页面，只会做页面的局部更新。

数据都需要通过ajax请求获取,并在前端异步展现



----

### 2. 什么是路由

一个路由其实就是一个映射关系（k:v）

key为路径，value可能是function 或者是 component

**后端路由：**

value是function，用来处理客户端提交的请求

注册路由：router.get(path,function(req,res))

工作过程：当node接收一个请求的时候，根据请求路径找到匹配的路由，调用路由中的函数来处理请求，返回响应的数据

**前端路由：**

浏览器端路由，value是Component，用于展示页面内容

注册路由：< Route path="/test" component={Test}>

工作过程：当浏览器的path变为/test的时候，当前路由组件就会变成Test组件

**前端路由的原理**

这个主要是依靠于history，也就是浏览器的历史记录。

浏览器上的记录其实就是一个栈，前进一次就是入栈，后退一次就是出栈。

并且历史记录上有一个监听的方法，可以时时刻刻监听记录的变化。从而判断是否改变路径

[History](https://developer.mozilla.org/zh-CN/docs/Web/API/History)



---

### 3. react-router-dom（5.0版本）

react的路由有三类：

web【主要适用于前端】,native【主要适用于本地】,anywhere【任何地方】

在这主要使用web也就是这个标题 react-router-dom

#### 3.1 基本的使用：

导航中的a标签改写成Link标签

< Link to="/路径" >xxx< /Link>

展示区写Route标签进行路径的匹配

< Route path = '/路径' component={组件名称}>

< App>最外侧包裹了一个< BrowserRouter>或者< HashRouter>

```
render() {
    return (
      <div>
        <Header />
        <div className="list-group">
          {/* NavLink在进行切换时，会给标签加一个名为active的类用来高亮显示，可以通过
          activeClassName手动控制添加的类，注意新增的类会与原来的active冲突，需要将新增的优先级提高 */}
          {/* <NavLink activeClassName='hover' className="list-group-item" to="/about">About</NavLink>
          <NavLink activeClassName='hover' className="list-group-item" to="/home">Home</NavLink> */}
          <MyNavLink to='/atguigu/about'>About</MyNavLink>
          <MyNavLink to='/atguigu/home'>Home</MyNavLink>
        </div>
        <div className="panel-body">
          {/* 注册路由，也就是写对应的关系 */}
          {/* Switch可以将path与路由一对一对应--单一匹配 */}
          <Switch>
            <Route path="/atguigu/about" component={About} />
            <Route path="/atguigu/home" component={Home} />
          </Switch>
        </div>
      </div>
    )
  }
  
  
index.js:
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>

);
```

---

#### 3.2 路由组件以及一般组件

1.写法不一样

一般组件：< Demo>

路由组件：< Route path="/demo" component ={Demo}/>

2.存放的位置一般不同

一般组件：components

路由组件：pages

3.接收的内容【props】

一般组件：写组件标签的时候传递什么，就能收到什么

路由组件：接收到三个固定的属性【history,location,match】

```
history:
    go: ƒ go(n)
    goBack: ƒ goBack()
    goForward: ƒ goForward()
    push: ƒ push(path, state)
    replace: ƒ replace(path, state)
location:
    pathname: "/about"
    search: ""
    state: undefined

match:
    params: {}
    path: "/about"
    url: "/about"
```

---

#### 3.3 NavLink

因为Link不能够改变标签体，因此只适合用于一些写死的标签。而如果想要有一些点击的效果，使用NavLink.

如下代码，就写了activeClassName，当点击的时候就会触发这个class的样式

```
{/*NavLink在点击的时候就会去找activeClassName="ss"所指定的class的值，如果不添加默认是active
 这是因为Link相当于是把标签写死了，不能去改变什么。*/}

<NavLink  ctiveClassName="ss" className="list-group-item"  to="/about">About</NavLink>
<NavLink className="list-group-item"  to="/home">Home</NavLink> 
```

但是可能一个导航又很多标签，如果这样重复的写NavLink也会造成很多的重复性的代码问题。

因此可以将NavLink进行一个封装：

```
 // 通过{...对象}的形式解析对象，相当于将对象中的属性全部展开
 //<NavLink to={this.props.to} children = {this.props.children}/>
<NavLink className="list-group-item" {...this.props}/>
```

在使用的时候：直接写每个标签中不一样的部分就行，比如路径和名称

```
{/*将NavLink进行封装，成为MyNavLink,通过props进行传参数，标签体内容props是特殊的一个属性，叫做children */}
<MyNavLink to="/about">About</MyNavLink>
```



---

#### 3.4 样式错误

拿上面的案例来说：

这里面会有一个样式：

![image-20240324194633495](https://cdn.jsdelivr.net/gh/summerlast57/TyporaPicture@main/picture/202404022032352.png)

此时，加载该样式的路径为：

![image-20240324194656187](https://cdn.jsdelivr.net/gh/summerlast57/TyporaPicture@main/picture/202404022032002.png)

但是在写路由的时候，有的时候就会出现多级目录，

```
<MyNavLink to = "/cyk/about" >About</MyNavLink>

<Route path="/cyk/about"component={About}/>
```

这个时候就在刷新页面，就会出现问题：

样式因为路径问题加载失败，此时页面返回public下面的Index.html

![image-20240324194747761](https://cdn.jsdelivr.net/gh/summerlast57/TyporaPicture@main/picture/202404022032757.png)

![image-20240324194831568](https://cdn.jsdelivr.net/gh/summerlast57/TyporaPicture@main/picture/202404022032147.png)

解决这个问题，有三个方法：

1.样式加载使用绝对位置

```
 <link href="/css/bootstrap.css" rel="stylesheet"> 
```

2.使用 %PUBLIC_URL%

```
 <link href="%PUBLIC_URL%/css/bootstrap.css" rel="stylesheet">
```

3.使用HashRouter

因为HashRouter会添加#，默认不会处理#后面的路径，所以也是可以解决的

---

#### 3.5 模糊匹配与精准匹配

react默认是开启模糊匹配的。

比如：

```
<MyNavLink to = "/home/a/b" >Home</MyNavLink>
```

此时该标签匹配的路由，分为三个部分 home a b；将会根据这个先后顺序匹配路由。

如下就可以匹配到相应的路由：

```
<Route path="/home"component={Home}/>
```

但是如果是下面这个就会失败，也就是说他是根据路径一级一级查询的，可以包含前面那一部分，但并不是只包含部分就可以。

```
<Route path="/a" component={Home}/>
```

当然也可以使用这个精确的匹配 exact={true}

如以下：这样就精确的匹配/home，则上面的/home/a/b就不行了

```
<Route exact={true}  path="/home" component={Home}/>
或者
<Route exact path="/home" component={Home}/>
```



---

#### 3.6 重定向路由

在配置好路由，最开始打开页面的时候，应该是不会匹配到任意一个组件。这个时候页面就显得极其不合适，此时应该默认的匹配到一个组件。此时就需要使用Redirect进行默认匹配了。如下的代码就是默认匹配/home路径所到的组件

```
<Switch>
    <Route path="/about"component={About}/>
    {/* exact={true}：开启严格匹配的模式，路径必须一致 */}
    <Route   path="/home" component={Home}/>
    {/* Redirect:如果上面的都没有匹配到，就匹配到这个路径下面 */}
    <Redirect  to = "/home"/>
</Switch>
```



---

#### 3.7 嵌套路由

简单来说就是在一个路由组件中又使用了一个路由，就形成了嵌套路由。

举个例子来说：

我们在home这个路由组件中又添加两个组件：

```
APP.jsx:
<Route   path="/home" component={Home}/>
Home.jsx:
<div>
    <ul className="nav nav-tabs">
    <li>
    	<MyNavLink to = "/home/news">News</MyNavLink>
    </li>
    <li>
    	<MyNavLink  to = "/home/message">Message</MyNavLink>
    </li>
    </ul>
    
    <Switch>
        <Route path = "/home/news" component={News} />
        <Route path = "/home/message" component={Message} />
        <Redirect to="/home/message"/>
    </Switch>
</div>
```

react中路由的注册是有顺序的，因此在匹配的时候也是按照这个顺序进行的，因此会先匹配父组件中的路由

比如上面的 /home/news的路由处理过程：

1.因为父组件home的路由是先注册的，因此在匹配的时候先去找home的路由，也就是根据/home/news先模糊匹配到/home

2.在去Home组件里面去匹配相应的路由，从而找到了/home/news进行匹配，因此找到了News组件。

但是如果开启精确匹配，就会在第一步的时候卡住，这个时候就走不下去了。**因此不要轻易的使用精确匹配**



---

#### 3.8 路由组件传递参数

向路由组件传递参数有三种方式：

![image-20240324223433761](https://cdn.jsdelivr.net/gh/summerlast57/TyporaPicture@main/picture/202404022033270.png)

**注意：当使用state参数时，注意把路由链接中path改为pathname，否则无反应**

示例：

```
<ul>
  {
  	details.map((detailObj) => {
      return (
      <li key={detailObj.id}>
      {/* 向路由组件传递params参数 */}
      {/* <Link to={`/home/message/detail/${detailObj.id}/${detailObj.title}`}>{detailObj.title}</Link> */}

      {/* 向路由组件传递search参数 */}
      {/* <Link to={`/home/message/detail?id=${detailObj.id}&title=${detailObj.title}`}>{detailObj.title}</Link> */}

      {/* 向路由组件传递state参数 */}
      <Link to={{pathname:'/home/message/detail',state:{id:detailObj.id,title:detailObj.title}}}>{detailObj.title}</Link>
      </li>
  		)
 	 })
  }
		{/* 声明接收params参数 */}
		{/* <Route path='/home/message/detail/:id/:title' component={Detail}></Route> */}

    {/* search参数无需接收参数，正常注册路由即可 */}
    {/* <Route path='/home/message/detail' component={Detail}></Route> */}

    {/* state参数无需接收参数，正常注册路由即可 */}
    <Route path='/home/message/detail' component={Detail}></Route>
</ul>
        
        
        
// 接收params参数
// const { id, title } = this.props.match.params

// 接收search参数
// const {search} = this.props.location
// const {id,title} = qs.parse(search.slice(1))

// 接收state参数
const { id, title } = this.props.location.state
```



---

#### 3.9 路由跳转

**push和replace**

路由跳转，默认情况下，开启的是 push 模式，也就是说，每次点击跳转，都会向栈中压入一个新的地址，在点击返回时，可以返回到上一个打开的地址

当我们在读消息的时候，有时候我们可能会不喜欢这种繁琐的跳转，我们可以开启 replace 模式，这种模式与 push 模式不同，它会将当前地址**替换**成点击的地址，也就是替换了新的栈顶，我们只需要在需要开启的链接上加上 `replace` 即可

```
<Link replace to={{ pathname: '/home/message/detail', state: { id: msgObj.id, title: msgObj.title } }}>{msgObj.title}</Link>
```



**编程式路由导航**

我们可以采用绑定事件的方式实现路由的跳转，我们在按钮上绑定一个 `onClick` 事件，当事件触发时，我们执行一个回调 `replaceShow`

这个函数接收两个参数，用来仿制默认的跳转方式，第一个是点击的 id 第二个是标题

我们在回调中，调用 `this.props.location` 对象下的 replace 方法

```
replaceShow = (id, title) => {
  this.props.history.replace(`/home/message/detail/${id}/${title}`)
}
```

同时我们可以借助 `this.props.history` 身上的 API 实现路由的跳转，例如 `go`、`goBack` 、`goForward`



**withRouter**

当我们需要在页面内部添加回退前进等按钮时，由于这些组件我们一般通过一般组件的方式去编写，因此我们会遇到一个问题，**无法获得 history 对象**，这正是因为我们采用的是一般组件造成的。

只有路由组件才能获取到 history 对象

因此我们需要如何解决这个问题呢

我们可以利用 `react-router-dom` 对象下的 `withRouter` 函数来对我们导出的 `Header` 组件进行包装，这样我们就能获得一个拥有 `history` 对象的一般组件

我们需要对哪个组件包装就在哪个组件下引入

```
import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import './index.css'

class Header extends Component {
  back = ()=>{
    this.props.history.goBack()
  }
  forward = ()=>{
    this.props.history.goForward()
  }
  render() {
    return (
      <div className='header'>
        <h2>React Router Demo</h2>
        <button onClick={this.back}>回退</button>&nbsp;
        <button onClick={this.forward}>前进</button>&nbsp;
      </div>
    )
  }
}
export default withRouter(Header)

// withRouter可以加工一般组件，让一般组件具备路由组件特有的api
// withRouter返回值是一个新组件
```

这样就能让一般组件获得路由组件所特有的 API



 **BrowserRouter 和 HashRouter 的区别**

**它们的底层实现原理不一样**

对于 BrowserRouter 来说它使用的是 React 为它封装的 history API ，这里的 history 和浏览器中的 history 有所不同噢！通过操作这些 API 来实现路由的保存等操作，但是这些 API 是 H5 中提出的，因此不兼容 IE9 以下版本。

对于 HashRouter 而言，它实现的原理是通过 URL 的哈希值，但是这句话我不是很理解，用一个简单的解释就是

我们可以理解为是锚点跳转，因为锚点跳转会保存历史记录，从而让 HashRouter 有了相关的前进后退操作，HashRouter 不会将 `#` 符号后面的内容请求。兼容性更好！

**地址栏的表现形式不一样**

- HashRouter 的路径中包含 `#` ，例如 `localhost:3000/#/demo/test`

**刷新后路由 state 参数改变**

1. 在BrowserRouter 中，state 保存在history 对象中，刷新不会丢失
2. HashRouter 则刷新会丢失 state



---

### 4.react-router-dom（6.0版本）

#### 4.1 路由组件

<Routes/>与<Route/>

1. v6版本移除了先前的<Switch/>，引入了新的替代者<Routes>
2. <Routes/>与<Route/>要配合使用，且<Routes/>包裹<Route/>
3. <Route> 相当于一个if语句，如果其路径与当前URL匹配，则呈现其对应的组件
4. <Route caseSensitive>属性用于指定：匹配时是否区分大小写（默认为false）
5. 当URL发生变化时<Routes>都会查看其所有子<Route>元素以找到最佳匹配并呈现组件
6. <Route>也可以嵌套使用，其可以配合`useRoutes()`配置路由表,但需要通过<Outlet>组件来渲染其子路由

示例：

```
新建一个routes文件夹，进行路由表的配置并导出
const routes = [
  {
    path: "/about",
    element: <About />
  },
  {
    path: '/home',
    element: <Home />,
    children: [
      {
        path: 'news',
        element: <News />
      },
      {
        path: 'message',
        element: <Message />,
        children:[
          {
            // 传递params参数
            // path:'detail/:id/:title/:content',

            // 传递search参数与state参数
            path:'detail',
            element: <Detail />
          }
        ]
      },
    ]
  },
  {
    path: '/',
    element: <Navigate to='/about' />
  }
]
export default routes

app.js:
export default function App() {
  // 根据路由表生成对应的路由规则
  const element = useRoutes(routes)

  function changeActiveClassName(isActive) {
    return isActive.isActive ? 'list-group-item hover' : 'list-group-item atguigu'
  }
  return (
    <div>
      <Header />
      <div className="list-group">
        <NavLink className={changeActiveClassName} to="/about">About</NavLink>
        <NavLink className={changeActiveClassName} to="/home">Home</NavLink>
      </div>
      <div className="panel-body">
        {/* 注册路由，也就是写对应的关系 */}
        {/* Routes代替Switch，用于一对一匹配，且Routes不可省略 */}
        {element}
      </div>
    </div>
  )
}
```



---

#### 4.2 NavLink

<NavLink>可实现导航的高亮效果。但如何自定义高亮效果发生了改变。v5版本可以通过activeclassName属性来控制高亮效果，但v6版本已经不允许这样用了，而是通过在className中使用回调函数返回真正的类名。示例如下：

```
function changeActiveClassName(isActive) {
  return isActive.isActive ? 'list-group-item hover' : 'list-group-item atguigu'
 }

<div className="list-group">
  <NavLink className={changeActiveClassName} to="/about">About</NavLink>
  <NavLink className={changeActiveClassName} to="/home">Home</NavLink>
</div>
```



---

#### 4.3 Navigate

作用:只要 <Navigate>组件被渲染，就会修改路径，切换视图。可用于实现重定向功能

replace属性用于控制跳转模式（push或replace，默认push）



---

#### 4.4 Outlet

作用：当<Route>产生嵌套时，渲染其对应的子路由

```
const routes = [
  {
    path: "/about",
    element: <About />
  },
  {
    path: '/home',
    element: <Home />,
    children: [
      {
        path: 'news',
        element: <News />
      },
      {
        path: 'message',
        element: <Message />,
        children:[
          {
            // 传递params参数
            // path:'detail/:id/:title/:content',

            // 传递search参数与state参数
            path:'detail',
            element: <Detail />
          }
        ]
      },
    ]
  },
  {
    path: '/',
    element: <Navigate to='/about' />
  }
]
export default routes

Home.js
export default function Home() {

  function changeActiveClassName(isActive) {
    return isActive.isActive ? 'list-group-item hover' : 'list-group-item atguigu'
  }
  return (
    <div>
      <h1>我是Home组件</h1>
      <div>
        <ul className='nav nav-tabs'>
          <li><NavLink className={changeActiveClassName} to="news">News</NavLink></li>
          <li><NavLink className={changeActiveClassName} to="message">Message</NavLink></li>
        </ul>
        {/* 指定路由组件呈现的位置 */}
        <Outlet/>
      </div>
    </div>
  )
}
```



----

#### 4.5 编程式路由导航

在v5版本，可以通过类式组件中的props属性中的history中的go，back等函数实现路由跳转。但在v6版本，由于多使用函数组件，没有this，于是需要通过useNavigate()来实现编程式路由导航

```
// 编程式路由导航-第一种方式，指定具体路径
const navigate = useNavigate()
  function showDetail(m) {
    navigate('detail',{
      state:{
        id:m.id,
        title:m.title,
        content:m.content
    }
  })
}
//第二种方式-传入数值进行前进或后退，类似于history.go()
const navigate = useNavigate()
function back() {
	navigate(-1)
}
function forward() {
	navigate(1)
}
```



---

#### 4.6 路由传参

1. 使用params参数：在路由表中需要进行配置
2. 使用search参数
3. 使用state参数

```
//路由表配置
const routes = [
  {
    path: "/about",
    element: <About />
  },
  {
    path: '/home',
    element: <Home />,
    children: [
      {
        path: 'news',
        element: <News />
      },
      {
        path: 'message',
        element: <Message />,
        children:[
          {
            // 传递params参数
            // path:'detail/:id/:title/:content',

            // 传递search参数与state参数
            path:'detail',
            element: <Detail />
          }
        ]
      },
    ]
  },
  {
    path: '/',
    element: <Navigate to='/about' />
  }
]
export default routes

//传递参数
{
message.map((m) => {
return (
// 传递params参数
// <li key={m.id}><Link to={`detail/${m.id}/${m.title}/${m.content}`}>{m.title}</Link></li>

// 传递search参数
// <li key={m.id}><Link to={`detail?id=${m.id}&title=${m.title}&content=${m.content}`}>{m.title}</Link></li>

// 传递state参数
<li key={m.id}><Link to='detail' state={{
  id:m.id,
  title:m.title,
  content:m.content
  }}>{m.title}</Link>&nbsp;
<button onClick={()=>showDetail(m)}>查看详情</button>
</li>
)
})
}

//接收参数
// import { useParams,useMatch } from "react-router-dom";

// import { useSearchParams,useLocation } from "react-router-dom";

import { useLocation } from "react-router-dom";

export default function Detail() {
  // 接收params参数
  // const {id,title,content} = useParams()
  // const m = useMatch('home/message/detail/:id/:title/:content')
  // console.log(m);

  // 接收search参数
  // const [search,setSearch] = useSearchParams()
  // const id = search.get('id');
  // const title = search.get('title');
  // const content = search.get('content');
  // const m = useLocation()
  // console.log(m);

  // 接收state参数
  const {state:{id,title,content}} = useLocation()
```







---

## React UI组件库

国内蚂蚁金服的ant-design组件库。

注意：在最新的antd版本中，即5.0版本以上，不再需要手动引入样式，也就是不需要配置按需引入。自定义主题直接查看官网即可。







---

## Redux

### 1.什么情况使用Redux

首先，我们先明晰 `Redux` 的作用 ，实现集中式状态管理。

`Redux` 适用于多交互、多数据源的场景。简单理解就是**复杂**

从组件角度去考虑的话，当我们有以下的应用场景时，我们可以尝试采用 `Redux` 来实现

1. 某个组件的状态需要共享时
2. 一个组件需要改变其他组件的状态时
3. 一个组件需要改变全局的状态时



---

### 2.Redux的工作流程

![image-20240325174727800](https://cdn.jsdelivr.net/gh/summerlast57/TyporaPicture@main/picture/202404022033305.png)

首先组件会在 Redux 中派发一个 `action` 方法，通过调用 `store.dispatch` 方法，将 `action` 对象派发给 `store` ，当 `store` 接收到 `action` 对象时，会将先前的 `state` 与传来的 `action` 一同发送给 `reducer` ，`reducer` 在接收到数据后，进行数据的更改，返回一个新的状态给 `store` ，最后由 `store` 更改 `state`



---

### 3.Redux Toolkit

[**Redux Toolkit**](https://redux-toolkit.js.org/) (也称为 **"RTK"** ) 是官方推荐的编写 Redux 逻辑的方法。`@reduxjs/toolkit` 包封装了核心的 `redux` 包，包含我们认为构建 Redux 应用所必须的 API 方法和常用依赖。 Redux Toolkit 集成了我们建议的最佳实践，简化了大部分 Redux 任务，阻止了常见错误，并让编写 Redux 应用程序变得更容易。

**如果今天你要写任何的 Redux 逻辑，你都应该使用 Redux Toolkit 来编写代码**

更多的有关Redux Toolkit建议前往官网自行查询。

通过下面的代码安装Redux Toolkit

```
# NPM
npm install @reduxjs/toolkit

# Yarn
yarn add @reduxjs/toolkit
```



---

### 4.Redux的三个核心概念

#### 4.1 store

`store` 是 Redux 的核心，可以理解为是 Redux 的数据中台，我们可以将任何我们想要存放的数据放在 `store` 中，在我们需要使用这些数据时，我们可以从中取出相应的数据。因此我们需要先创建一个 `store` ，在 Redux 中可以使用 `createStore` API 来创建一个 `store`

在生产中，我们需要在 `src` 目录下的 `redux` 文件夹中新增一个 `store.js` 文件，在这个文件中，创建一个 `store` 对象，并暴露它

因此我们需要从 `redux` 中暴露两个方法

```
import {
    createStore,
    applyMiddleware
} from 'redux'
```

并引入为 count 组件服务的 reducer

```
import countReducer from './count_reducer'
```

最后调用 `createStore` 方法来暴露 `store`

```
export default createStore(countReducer, applyMiddleware(thunk))
```

**注意：在这里引用了applyMiddleware中间件以及thunk，这些是为了实现异步action**

在 `store` 对象下有一些常用的内置方法

获取当前时刻的 `store` ，我们可以采用 `getStore` 方法

```
const state = store.getState();
```

在前面我们的流程图中，我们需要通过 `store` 中的 `dispatch` 方法来派生一个 `action` 对象给 `store`

```
store.dispatch(`action对象`)
```

最后还有一个 `subscribe` 方法，这个方法可以帮助我们订阅 `store` 的改变，只要 `store` 发生改变，这个方法的回调就会执行

为了监听数据的更新，我们可以将 `subscribe` 方法绑定在组件挂载完毕生命周期函数上，但是这样，当我们的组件数量很多时，会比较的麻烦，因此我们可以直接将 `subscribe` 函数用来监听整个 `App`组件的变化。但在最新版本的react中（18.0），此做法不作效。建议引入react-redux，使用Provider包裹根组件

```
store.subscribe(() => {
    ReactDOM.render( < App /> , document.getElementById('root'))
})
```



---

#### 4.2 action

`action` 是 `store` 中唯一的数据来源，一般来说，我们会通过调用 `store.dispatch` 将 action 传到 store

我们需要传递的 `action` 是一个对象，它必须要有一个 `type` 值

例如，这里我们暴露了一个用于返回一个 `action` 对象的方法

```
export const createIncrementAction = data => ({
    type: INCREMENT,
    data
})
```

我们调用它时，会返回一个 `action` 对象



---

#### 4.3 reducer

在 Reducer 中，我们需要指定状态的操作类型，要做怎样的数据更新，因此这个类型是必要的。

reducer 会根据 action 的指示，对 state 进行对应的操作，然后返回操作后的 state

如下，我们对接收的 action 中传来的 type 进行判断

```
export default function countReducer(preState = initState, action) {
    const { type, data } = action;
    switch (type) {
        case INCREMENT:
            return preState + data
        case DECREMENT:
            return preState - data
        default:
            return preState
    }
}
```

更改数据，返回新的状态



---

#### 4.4 异步action

先尝试把异步任务封装到 `action` 对象中调用

```
export const createIncrementAsyncAction = (data, time) => {
    // 无需引入 store ，在调用的时候是由 store 调用的
    return (dispatch) => {
        setTimeout(() => {
            dispatch(createIncrementAction(data))
        }, time)
    }
}
```

当我们点击异步加操作时，我们会调用这个函数，在这个函数里接收一个延时加的时间，还有action所需的数据，和原先的区别只在于返回的是一个定时器函数

但是如果仅仅这样，很显然是会报错的，它默认需要接收一个对象

如果我们需要实现传入函数，那我们就需要告诉：你只需要默默的帮我执行以下这个函数就好！

这时我们就需要引入中间件，在原生的 `redux` 中暴露出 `applyMiddleware` 中间件执行函数，并引入 `redux-thunk` 中间件（需要手动下载）

```
import thunk from 'redux-thunk'
```

通过第二个参数传递下去就可以了

```
export default createStore(countReducer, applyMiddleware(thunk))
```

注意：异步 action 不是必须要写的，完全可以自己等待异步任务的结果后再去分发同步action

> 采用 `react-thunk` 能让异步代码像同步代码一样执行，在 `redux` 中我们也是可以实现异步的，但是这样我们的代码中会有很多异步的细节，这不是我们想看到的，利用 `react-thunk` 之类的库，就能让我们只关心我们的业务



---

#### 4.5 Redux三大原则

第一个原则

**单向数据流**：整个 Redux 中，数据流向是单向的

UI 组件 ---> action ---> store ---> reducer ---> store

第二个原则

**state 只读**：在 Redux 中不能通过直接改变 state ，来控制状态的改变，如果想要改变 state ，则需要触发一次 action。通过 action 执行 reducer

第三个原则

**纯函数执行**：每一个reducer 都是一个纯函数，不会有任何副作用，返回是一个新的 state，state 改变会触发 store 中的 subscribe







---

## React-Redux

在前面我们学习了 Redux ，我们在写案例的时候，也发现了它存在着一些问题，例如组件无法状态无法公用，每一个状态组件都需要通过订阅来监视，状态更新会影响到全部组件更新，面对着这些问题，React 官方在 redux 基础上提出了 React-Redux 库

在前面的案例中，我们如果把 store 直接写在了 React 应用的顶层 props 中，各个子组件，就能访问到顶层 props

```
<顶层组件 store={store}>
  <App />
</顶层组件/>
```

这就类似于 React-Redux

### 1. 容器组件和UI组件

1. 所有的 UI 组件都需要有一个容器组件包裹
2. 容器组件来负责和 Redux 打交道，可以随意使用 Redux 的API
3. UI 组件无任何 Redux API
4. 容器组件用于处理逻辑，UI 组件只会负责渲染和交互，不处理逻辑

![image-20240327010017564](https://cdn.jsdelivr.net/gh/summerlast57/TyporaPicture@main/picture/202404022033634.png)

在我们的生产当中，我们可以直接将 UI 组件写在容器组件的代码文件当中，这样就无需多个文件

首先，我们在 src 目录下，创建一个 `containers` 文件夹，用于存放各种容器组件，在该文件夹内创建 `Count` 文件夹，即表示即将创建 Count 容器组件，再创建 `index.jsx` 编写代码

要实现容器组件和 UI 组件的连接，我们需要通过 `connect` 来实现

```
// 引入UI组件
import CountUI from '../../components/Count'
// 引入 connect 连接UI组件
import {connect} from 'react-redux'
// 建立连接
export default connect()(CountUI)
```



----

### 2. Provider

由于我们的状态可能会被很多组件使用，所以 React-Redux 给我们提供了一个 Provider 组件，可以全局注入 redux 中的 store ，只需要把 Provider 注册在根部组件即可

在 src 目录下的 `index.js` 文件中，引入 `Provider` ，直接用 `Provider` 标签包裹 `App` 组件，将 `store` 写在 `Provider` 中即可

```
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

这样我们在 `App.jsx` 文件中，组件无需手写指定 `store` ，即可使用 `store`



---

### 3. connect

在前面我们看到的 react-redux 原理图时，我们会发现容器组件需要给 UI 组件传递状态和方法，并且是通过 `props` 来传递，看起来很简单。但是，我们会发现容器组件中似乎没有我们平常传递 `props` 的情形

这时候就需要继续研究一下容器组件中的唯一一个函数 `connect`

connect 方法是一个连接器，用于连接容器组件和 UI 组件，它第一次执行时，接收4个参数，这些参数都是**可选的**，它执行的执行的结果还是一个函数，第二次执行接收一个 UI 组件

第一次执行时的四个参数：`mapStateToProps` 、`mapDispatchToProps` 、`mergeProps`、`options`

**mapStateToProps**

```
const mapStateToProps = state => ({ count: state })
```

它接收 `state` 作为参数，并且返回一个对象，这个对象标识着 UI 组件的同名参数，

返回的对象中的 key 就作为传递给 UI 组件 props 的 key，value 就作为 props 的 value

如上面的代码，我们可以在 UI 组件中直接通过 props 来读取 `count` 值

```
<h1>当前求和为：{this.props.count}</h1>
```

这样我们就打通了 UI 组件和容器组件间的状态传递，那如何传递方法呢？

**mapDispatchToProps**

connect 接受的第二个参数是 `mapDispatchToProps` 它是用于建立 UI 组件的参数到 `store.dispacth` 方法的映射

我们可以把参数写成对象形式，在这里面定义 action 执行的方法，例如 `jia` 执行什么函数，`jian` 执行什么函数？

我们都可以在这个参数中定义，如下定义了几个方法对应的操作函数

```
{
  increment: createIncrementAction,
  decrement: createDecrementAction,
  asyncIncrement: createIncrementAsyncAction,
}
```



---

### 4. 数据共享

在使用redux的时候，通常是多个组件需要使用同一个数据，如何实现多个组件之间的数据共享呢？

在引入react-redux库的时候，需要建立容器组件和UI组件，在实际过程中，我们可以把容器组件与UI组件写在一个页面，通过connect暴露容器组件并连接UI组件。同时需要引入redux，在redux文件夹下创建对应的action对象，reducer函数，以及唯一的store。多个组件创建多个不同的action和reducer。

在暴露store的时候，需要将多个组件的reducer一起传入，这时候就需要引入redux的combineReducers用来汇总所有的reducer

```
/* 
  该文件用于汇总所有的reducer
*/
// 引入为Count组件服务的reducer
import countReducer from './count'
// 引入为Person组件服务的reducer
import personReducer from "./person";
// 引入combineReducers用于汇总所有的reducer
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  count:countReducer,
  persons:personReducer
})
export default rootReducer
```

这里需要注意，在combineReducers中的reducer中，count和persons都是最终共享的数据名，在使用过程中，需要使用正确的数据名。

```
export default connect(
  state => ({ 
    count: state.count,
    personCount:state.persons.length
   }),
  {
    increment: createIncrementAction,
    decrement: createDecrementAction,
    asyncIncrement: createIncrementAsyncAction,
  }
)(CountUI)
```

通过这样就可以实现数据的共享了。

有一个react-redux开发者工具，可以让我们更好的观察到数据state的改变，下载和用法如下：

```
npm i redux-devtools-extension

// 引入react-redux开发者工具
import { composeWithDevTools } from "redux-devtools-extension";
// 暴露store
export default createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)))
```





---

## React Hooks（核心）

### 1.hooks存在的意义

1. hooks 之间的状态是独立的，有自己独立的上下文，不会出现混淆状态的情况
2. 让函数有了状态管理
3. 解决了 组件树不直观、类组件难维护、逻辑不易复用的问题
4. 避免函数重复执行的副作用



---

### 2.应用场景

1. 利用 hooks 取代生命周期函数
2. 让组件有了状态
3. 组件辅助函数
4. 处理发送请求
5. 存取数据
6. 做好性能优化



---

### 3.hooks API

从react中引入

#### 3.1 useState

`useState` 是一个 React Hook，它允许你向组件添加一个 状态变量

```
const [count, setCount] = React.useState(0)
```

接收一个参数作为初始值，返回一个数组：第一个是状态变量，第二个是修改变量的函数

修改变量的函数修改规则为直接替换，所以当变量为对象时，需要将对象的展开，再将具体的属性值传过去

```
const [count, setCount] = React.useState({
	count:0,
	message:[]
})
setCount({...count,message:[1,2,3]})
```



---

#### 3.2 useEffect

副作用 hooks

- 给没有生命周期的组件，添加结束渲染的信号

注意：

- render 之后执行的 hooks

第一个参数接收一个函数，在组件更新的时候执行

第二个参数接收一个数组，用来表示需要追踪的变量，依赖列表，只有依赖更新的时候才会更新内容

第一个参数的返回值，返回一个函数，在 `useEffect` 执行之前，都会先执行里面返回的函数

一般用于添加销毁事件，这样就能保证只添加一个



---

#### 3.3 useLayoutEffect

和 `useEffect` 很类似

它的作用是：在 DOM 更新完成之后执行某个操作

注意：

- 有 DOM 操作的副作用 hooks
- 在 DOM 更新之后执行

> 执行时机在 `useEffect` 之前，其他都和 `useEffect` 都相同

`useEffect` 执行时机在 **render 之后**

`useLayoutEffect` 执行时机在 **DOM 更新之后**



---

#### 3.4 useMemo

作用：让组件中的函数跟随状态更新

`useMemo` 主要用于性能优化，它可以缓存计算昂贵的值，并在依赖项更改时重新计算。适合使用 `useMemo` 的场景包括：

1. **计算昂贵的值：** 当某个值的计算成本较高时，例如大量数据的映射或过滤操作、复杂的数学计算等，可以使用 `useMemo` 缓存计算结果，避免不必要的重复计算。
2. **避免不必要的重新渲染：** 当组件的渲染依赖于某些计算结果，但这些结果在依赖项未更改时保持不变时，可以使用 `useMemo` 缓存计算结果，以避免不必要的重新渲染。
3. **优化性能：** 在性能敏感的场景下，使用 `useMemo` 可以显著提高组件的性能，尤其是当组件渲染频率较高或依赖项较多时。

**为了避免由于其他状态更新导致的当前函数的被迫执行**

第一个参数接收一个函数，第二个参数为数组的依赖列表，返回一个值

```
import React, { useMemo } from 'react';

const MyComponent = ({ list }) => {
  // 使用useMemo缓存昂贵的计算结果
  const filteredList = useMemo(() => {
    return list.filter(item => item % 2 === 0); // 过滤偶数
  }, [list]); // list作为依赖项，当list改变时重新计算

  return (
    <div>
      <h1>Filtered List</h1>
      <ul>
        {filteredList.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyComponent;

```



---

#### 3.5 useCallback

作用：跟随状态更新执行

注意：

- 只有依赖项改变时才执行
- `useMemo( () => fn, deps)` 相当于 `useCallback(fn, deps)`

不同点：

1. `useCallback` **返回的是一个函数，不再是值**
2. `useCallback` 缓存的是一个函数，`useMemo` 缓存的是一个值，**如果依赖不更新，返回的永远是缓存的那个函数**
3. 给子组件中传递 `props` 的时候，如果当前组件不更新，不会触发子组件的重新渲染



---

#### 3.6 useRef

作用：长久保存数据

注意事项：

- 返回一个子元素索引，这个索引在整个生命周期中保持不变
- 对象发生改变时，不通知，属性变更不重新渲染

1. 保存一个值，在整个生命周期中维持不变
2. 重新赋值 `ref.current` 不会触发重新渲染
3. 相当于**创建一个额外的容器来存储数据**，我们可以在外部拿到这个值

当我们通过正常的方式去获取计时器的 `id` 是无法获取的，需要通过 `ref`

```
useEffect(() => {
    ref.current = setInterval(() => {
        setNum(num => num + 1)
    }, 400)
}, [])
useEffect(() => {
    if (num > 10) {
        console.log('到十了');
        clearInterval(ref.current)
    }
}, [num])
```



---

#### 3.7 useContext

作用：带着子组件渲染

注意：

- 上层数据发生改变，肯定会触发重新渲染

1. 我们需要引入 `useContext` 和 `createContext` 两个内容
2. 通过 `createContext` 创建一个 `Context` 句柄
3. 通过 `Provider` 确定数据共享范围
4. 通过 `value` 来分发数据
5. 在子组件中，通过 `useContext` 来获取数据

```
import React, { useContext, createContext } from 'react'
const Context = createContext(null)
export default function Hook() {
    const [num, setNum] = React.useState(1)

    return (
        <h1>
            这是一个函数组件 - {num}
        // 确定范围
            <Context.Provider value={num}>
                <Item1 num={num} />
                <Item2 num={num} />
            </Context.Provider>
        </h1>
    )
}
function Item1() {
    const num = useContext(Context)
    return <div>子组件1  {num}</div>
}
function Item2() {
    const num = useContext(Context)
    return <div>子组件2 {num}</div>
}

```



---

#### 3.8 useReducer

作用：去其他地方借资源

注意：函数组件的 Redux 的操作

1. 创建数据仓库 `store` 和管理者 `reducer`
2. 通过 `useReducer(store,dispatch)` 来获取 `state` 和 `dispatch`

```
const store = {
    num: 10
}
const reducer = (state, action) => {
    switch (action.type) {
        case "":
            return
        default:
            return
    }
}
    const [state, dispatch] = useReducer(reducer, store)
```

通过 `dispatch` 去派发 `action`



---

#### 3.9 自定义 hooks

放在 `utils` 文件夹中，以 `use` 开头命名

例如：模拟数据请求的 Hooks

```
import React, { useState, useEffect } from "react";
function useLoadData() {
  const [num, setNum] = useState(1);
  useEffect(() => {
    setTimeout(() => {
      setNum(2);
    }, 1000);
  }, []);
  return [num, setNum];
}
export default useLoadData;
```

减少代码耦合

我们希望 reducer 能让每个组件来使用，我们自己写一个 hooks

自定义一个自己的 LocalReducer

```
import React, { useReducer } from "react";
const store = { num: 1210 };
const reducer = (state, action) => {
  switch (action.type) {
    case "num":
      return { ...state, num: action.num };
    default:
      return { ...state };
  }
};
function useLocalReducer() {
  const [state, dispatch] = useReducer(reducer, store);
  return [state, dispatch];
}
export default useLocalReducer;
```

1. 引入 react 和自己需要的 hook
2. 创建自己的hook函数
3. 返回一个数组，数组中第一个内容是数据，第二个是修改数据的函数
4. 暴露自定义 hook 函数出去
5. 引入自己的业务组件

























