import { useEffect, useState } from "react";

// useEffect(callback, [dependencies])

// Events: Add / remove event listener
// Observer pattern: Subscribe / unsubscribe
// Closure
// Times: setInterval, setTimeout, clearInterval, clearTimeout
// useState
// Mounted / Unmounted
// ===
// Call API

/**
1. Update DOM
    - F8 blog title
2. Call API
3. Listen DOM events
    - Scoll
    - Resize
4. Cleanup
    - Remove listener / Unsubscribe
    - Clear timers
*/

// 1. useEffect(callback)
// - Gọi callback mỗi khi component re-render
// - Gọi callback sau khi component thêm element vào DOM

// 2. useEffect(callback, [])
// - Chỉ gọi callback 1 lần sau khi component mounted

// 3. useEffect(callback, [deps])
// - callback sẽ được gọi lại mỗi khi deps thay đổi

// ------- Phần chung
// 1. Gọi callback sau khi component thêm element vào DOM
// 2. Callback luôn được gọi sau khi component mounted
// 3. Cleanup function luôn được gọi trước khi component unmounted
// 4. Cleanup function luôn được gọi trước khi callback được gọi (trừ lần mounted)

// FQA
// 1. Callback gọi sau khi elements được mounted vào DOM
// 2. Phân biệt Mounted & Re-render
// 3. Có thể sử dụng nhiều dependencies, ít nhất 1 dependencies thay đổi
// 4. Sử dụng dependencies khi nào?
// 5. Có nên viết nhiều logic khác nhau trong 1 useEffect?
// 6. Phân biệt cách truyền callback qua props
// 7. Khi setState cùng một giá trị thì component sẽ không re-render

const tabs = [ 'posts', 'comments', 'albums' ]

function App() {
    const [datas, setDatas] = useState([])
    const [type, setType] = useState('posts')

    useEffect(() => {
        fetch(`https://jsonplaceholder.tepicode.com/${type}`)
            .then(res => res.json())
            .then((datas => {
                setDatas(datas)
            }))
    }, [type])

    return (
        <div>
            {tabs.map((tab) => (
                <button key={tab} onClick={() => setType(tab)}>{tab}</button>
            ))}

            <ul>
                {datas.map((data) => (
                    <li key={data.id}>
                        {data.title || data.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}

// useEffect() with DOM events
// Áp dụng cleanup function
// 2. Cleanup function luôn được gọi trước khi component unmounted
function EventScroll () {
    const [showGoToTop, setShowGoToTop] = useState(false)

    useEffect(() => {

        const handleScroll = () => {
            if (window.scroll >= 200) {
                setShowGoToTop(true)
            } else {
                setShowGoToTop(false)
            }
        }

        window.addEventListener('scroll', handleScroll)

        // cleanup function
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    })

    return (
        <div style={{height: '2000px'}}>
            <h2>UseEffectDOMEvents</h2>
        </div>
    )
}

function ResizeScroll () {
    const [width, setWidth] = useState(window.innerWidth)

    useEffect(() => {

        const handleResize = () => {
            setWidth(window.innerWidth)
        }

        window.addEventListener('resize', handleResize)

        // cleanup function
        return () => {
            window.removeEventListener('resize', handleResize)
        }

    }, [])

    return (
        <div>
            <h2>{width}</h2>
        </div>
    )
}

function CountDown () {
    const [countDown, setCountDown] = useState(180)

    // sử dung setInterval(() => {})
    useEffect(() => {
        // setInterval chạy vô hạn
        const timerId = setInterval(() => {
            setCountDown(prev => prev - 1)
        }, 1000)

        return () => clearInterval(timerId)
    }, [])

    // sử dụng setTimeout(() => {})
    useEffect(() => {
        // setTimeout chỉ chạy 1 lần
        setTimeout(() => {
            setCountDown(countDown - 1)
        }, 1000)
    }, [countDown])

    useEffect(() => {
        setInterval(() => {
            setCountDown(prev => prev - 1)
        })

    }, [])

    return (
        <div>
            <h2>{countDown}</h2>
        </div>
    )
}

// 3. Cleanup function luôn được gọi trước khi callback được gọi (trừ lần mounted)
// function App3() {
//     const [count, setCount] = useState(1)

//     useEffect(() => {

//         console.log(`Mounted or Re-render lần ${count}`)

//         // cleanup function
//         return () => {
//             console.log(`cleanup lần ${count}`)
//         }

//     }, [])

//     return (
//         <div>
//             <h1>{count}</h1>

//             <button onClick={() => setCount(count + 1)}>Click me!</button>
//         </div>
//     )
// }

// VD1 / bài 59
function App3 () {
    const [avatar, setAvatar] = useState({})

    useEffect(() => {

        // cleanup function
        return () => {
            avatar && URL.revokeObjectURL()
        }
    }, [avatar])

    const handlePreviewAvatar = (e) => {
        const file = e.target.files[0]
        // do file ở đây là obj nên
        file.preview = URL.createObjectURL(file)

        setAvatar(file)
    }

    return (
        <div>
            <input type="file" onChange={handlePreviewAvatar}/>

            {avatar && (
                <img src={avatar.preview} alt="" width='80%'/>
            )}
        </div>
    )
}

// VD2 / lesson 60 - useEffect() with fake chat app
// Fake comments
function emitComment (id) {
    setInterval(() => {
        window.dispatchEvent(
            new CustomEvent(`lesson-${id}`, {
                detail: `Nội dung comment của lesson ${id}`
            })
        )
    }, 2000)
}

emitComment(1)
emitComment(2)
emitComment(3)

const lessons = [
    {
        id: 1,
        name: 'lesson 1'
    },
    {
        id: 2,
        name: 'lesson 2'
    },
    {
        id: 3,
        name: 'lesson 3'
    },
]

function Content () {
    const [lessonId, setLessonId] = useState(1)

    useEffect(() => {
        const handleComment = ({detail}) => {
            console.log(detail)
        }

        window.addEventListener(`lesson-${lessonId}`, handleComment)

        return () => {
            window.removeEventListener(`lesson-${lessonId}`, handleComment)
        }
    }, [lessonId])

    return (
        <div>
            <ul>
                {lessons.map(lesson => (
                    <li 
                        key={lesson.id} 
                        style={{
                            color: lesson === lessonId ? 'red' : '#333'
                        }}
                        onClick={() => setLessonId(lesson.id)}
                    >
                        {lesson.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}