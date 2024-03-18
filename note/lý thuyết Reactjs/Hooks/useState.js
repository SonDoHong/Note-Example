// One-way binding / Rằng buộc 1 chiều
// Two-way binding / Răng buộc 2 chiều
// Nếu ng dùng sửa ở giao diện mà chỉ dữ liệu trong code thay đổi thì là One-way binding
// Còn không chỉ dữ liệu trong code thay đổi mà ngoài giao diện web nữa thì là Two-way binding

// ### Lưu ý
// - Component được re-render sau khi `setState`
// - Initial state chỉ dùng cho lần đầu
// - Set state với callback?
// - Initial state với callback?
// - Set state là thay thế state bằng giá trị mới

import { useState } from 'react'

function UseState() {
    const gifts = [
        'html',
        'css',
        'javascript',
        'reactjs'
    ]

    const [gift, setGift] = useState('')

    const handleGift = () => {
        const index = Math.floor(Math.random() * gifts.length)

        setGift(gifts[index])
    }

    return (
        <div>
            <h1>{gift || 'Chưa có phần thưởng'}</h1>

            <button onClick={handleGift}>Lấy thưởng</button>
        </div>
    )
}