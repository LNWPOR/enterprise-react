import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import auth from 'modules/auth/reducer'
import ui from 'modules/ui/reducer'
import articles from 'modules/articles/reducer'
import categories from 'modules/categories/reducer'
import users from 'modules/users/reducer'

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    auth,
    ui,
    articles,
    categories,
    users,
  })
