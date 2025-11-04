import { createConditionPlugin } from '@innet/utils'
import { ViewBase } from '@nativescript/core'
import { useApp } from 'innet'

export const view = createConditionPlugin(() => useApp() instanceof ViewBase)
