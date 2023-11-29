import { now, useStorage } from '@vueuse/core'

export  const stateStorage = useStorage('my-store', [])