function sidebar() {
    var dom = document.getElementById('root');
    var sidebar = document.createElement('div');
    sidebar.innerText = 'sidebar';
    dom.appendChild(sidebar)
}
// ESModule
// export default sidebar

// cmd
module.exports = sidebar;