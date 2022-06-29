import loading from '@/components/common/Loading'
import { createApp } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import defaultImg from '@/assets/images/lazy.png'

export default {
    install(app){
        // 加载动画
        app.directive('loading', {
            //绑定指令的DOM
            mounted(el, binding) {
                // loading组件封装应用对象
                const app = createApp(loading)
                // loading 组件的实例对象
                const instance = app.mount(document.createElement('div'))
                el.instance = instance
                if(binding.value){
                    appendEl(el)
                }
            },
            // 更新的时间
            updated(el, binding) {
                if(binding.value !== binding.oldValue){
                    binding.value ? appendEl(el): removeEl(el)
                }
            }
        })

        // 图片懒加载
        // 逻辑：
        app.directive('img-lazy',{
            mounted(el, binding){
                // 全部设置为占位图片
                el.src = defaultImg
                const { stop } = useIntersectionObserver(el, ([{isIntersecting}])=>{
                    // isIntersecting: true 进入视口区域   false： 未进入视口区域
                    if(isIntersecting){
                        // 加载失败
                        el.onerror = function (){
                            el.src = defaultImg
                        }
                        el.src = binding.value
                        // 停止监听
                        stop()
                    }
                })
            }
        })
    }
}

function appendEl(el){
    const style = getComputedStyle(el)
    let arr =['absolute','fixed', 'relative']
    if(arr.indexOf(style.position) === -1){
        el.classList.add('g-relative')
    }
    el.appendChild(el.instance.$el)
}
function removeEl(el){
    el.classList.remove('g-relative')
    el.removeChild(el.instance.$el)
}