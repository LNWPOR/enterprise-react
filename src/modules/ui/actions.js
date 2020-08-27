const TOGGLE_DARK_MODE = 'app/ui/TOGGLE_DARK_MODE'
const TOGGLE_DRAWER = 'app/ui/TOGGLE_DRAWER'
const SET_DARK_MODE = 'app/ui/SET_DARK_MODE'
const SET_FLASH_MESSAGE = 'app/ui/SET_FLASH_MESSAGE'
const CLEAR_FLASH_MESSAGE = 'app/ui/CLEAR_FLASH_MESSAGE'

function toggleDarkMode() {
  return {
    type: TOGGLE_DARK_MODE,
  }
}

function toggleDrawer() {
  return {
    type: TOGGLE_DRAWER,
  }
}

function setFlashMessage(message) {
  return {
    type: SET_FLASH_MESSAGE,
    payload: {
      message,
    },
  }
}

function clearFlashMessage() {
  return {
    type: CLEAR_FLASH_MESSAGE,
  }
}

function setDarkMode(darkMode) {
  return {
    type: SET_DARK_MODE,
    payload: {
      darkMode,
    },
  }
}

export {
  TOGGLE_DARK_MODE,
  TOGGLE_DRAWER,
  SET_DARK_MODE,
  SET_FLASH_MESSAGE,
  CLEAR_FLASH_MESSAGE,
  toggleDarkMode,
  toggleDrawer,
  setFlashMessage,
  setDarkMode,
  clearFlashMessage,
}
