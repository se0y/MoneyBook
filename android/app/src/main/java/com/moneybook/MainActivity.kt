package com.moneybook

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.ReactRootView
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView // 추가
import android.os.Bundle

class MainActivity : ReactActivity() {

    override fun getMainComponentName(): String = "moneybook"

    override fun createReactActivityDelegate(): ReactActivityDelegate =
        object : ReactActivityDelegate(this, mainComponentName) {
            override fun createRootView(): ReactRootView {
                // GestureHandler를 활성화
                return RNGestureHandlerEnabledRootView(this@MainActivity)
            }
        }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(null)
    }
}