
// 1.
// 2.   Template literals
// 3.   Multi-line String
// 4.   Arrow function -> nameFC = () => {}
// 5.   CLasser
// 6.   Enhanced object literals
// 7.   Default parameter values
// 8.   Destructuring -> {key, key} = object // tương tự với array
// 9.   Rest parameters -> (...)
// 10.  Spread -> (...)
// 11.  Tagged template literal
// 12.  Modules: Import / Export

// 6.   Enhanced object literals
// Có 3 định nghĩa:
//  1, Định nghĩa key: value cho object
//  2, Định nghĩa method cho object
//  3, Định nghĩa key cho object dưới dạng
const name1 = 'Javascript'
const price = 1000

const course = {
    // Định nghĩa 1
    name1,
    price, 

    // Định nghĩa 2
    getName () {
        return name1
    },

    // Định nghĩa 3
    [name1]: 'javascript',
    [price]: 1000
}

// 8.   Destructuring
const object = {
    name: 'son',
    age: 18
}

const { name: nameobject, age } = object

console.log(nameobject, age) // 'son' 18

// 9.   Rest parameters -> (...)
// Là khi kết hợp sử dụng với :
//      + Destructuring
//      + Định nghĩa ra cái tham số / fc(...rest) {}

// 10.  Spread
// Là khi kết hợp sử dụng với :
//      + Truyền Đối số cho FC
//      + Giải ... cho 1 arr/obj
// Nếu ... đứng trước 1 array or object thì arr/obj đó
// sẽ bỏ đi []/{} trả về phần tử trong đó
var array1 = ['javascript', 'PHP', 'Ruby']

var array2 = ['reactjs', 'Dart']

var array3 = [...array2, ...array1]

console.log(array3) // ['reactjs', 'Dart', 'javascript', 'PHP', 'Ruby']

// 9 + 10: phân biệt Rest và Spread
// VD:
function Input ({ label, ...inputProps }) { // ...inputProps này là Rest
    return (
        <div>
            <label>{label}</label>

            <input {...inputProps}/> {/** ...inputProps này là Spread */}
        </div>
    )
}

function App () {
    return (
        <div>
            <Input 
                label={'Full name'}
                type='text'
                placeholder='Enter name...'
                title='Day la input'
            />
        </div>
    )
}