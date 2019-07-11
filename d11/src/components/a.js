// export function renderA() {
//     let a = document.getElementById('one')
//     a.innerHTML = `
//         <ul>
//         <li>1</li>
//         <li>2</li>
//         <li>3</li>
//         <li>5</li>
// </ul>
//
//     `
// }

export function componentA () {
    let a = document.createElement('ul')
    a.innerHTML = `
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>4</li>
        <li>4</li>
        <li>4</li>
        <li>4</li>
        <li>5</li>
    `
    return a
}
