const reducer = (state = [], action) => {
    switch(action.type) {
        case 'DATA':
            return { data: action.data }
        default: 
            return { data: state }
    }
}

export default reducer;