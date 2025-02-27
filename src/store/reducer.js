const initialState = {
    code: "def main(private field a, field b) -> (field):\n\tfield result = if a * a == b then 1 else 0 fi\n\treturn result",
    theme: 'tomorrow'
};

const reducer = (state, action) => {
    switch (action.type) 
    {
        case 'on_loaded_provider': {
            return {
                ...state,
                zokratesProvider: action.payload
            }
        }
        case 'on_compilation': {
            return {
                ...state,
                artifacts: action.payload
            }
        }
        case 'on_code_change': {
            return {
                ...state,
                code: action.payload
            }
        }
        case 'on_theme_change': {
            return {
                ...state,
                theme: action.payload
            }
        }
        case 'on_setup': {
            return {
                ...state,
                keypair: action.payload
            }
        }
        default:
            return state;
    }
};

export { initialState, reducer };