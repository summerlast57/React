import { Navigate } from "react-router-dom";
import Home from '../pages/Home'
import About from '../pages/About'
import News from '../pages/News'
import Message from '../pages/Message'
import Detail from '../pages/Detail'


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
