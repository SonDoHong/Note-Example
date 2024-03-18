// Mounted / Gắn vào
// Unmounted / Gỡ ra

import { useState } from "react"

function App () {
    const [show, setShow] = useState(false)

    return (
        <div>
            <button onClick={() => setShow(!show)}>Toggle</button>

            {/* 
                show = false => Unmounted
                show = true => Mounted
            */}
            {show && 'Hello world'}
        </div>
    )
}