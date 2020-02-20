export const onLoadedProvider = (provider) => {
    return {
        type: 'on_loaded_provider',
        payload: provider
    }
}
 
export const onCodeChange = (code) => {
    return {
        type: 'on_code_change',
        payload: code
    }
}

export const onThemeChange = (theme) => {
    return {
        type: 'on_theme_change',
        payload: theme
    }
}

export const onCompilation = (artifacts) => {
    return {
        type: 'on_compilation', 
        payload: artifacts
    }
}