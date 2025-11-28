import { Provider } from 'react-redux'
import { RouterConfig } from './routers/RouterConfig'
import { store } from './stores'

export const App = () => {
  
  return (
    <Provider store={store}> 
      <RouterConfig/>
    </Provider>
  )
}
