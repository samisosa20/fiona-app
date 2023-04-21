const useAuthInitialStates = () => {
    const initialStateAuth = {
        auth_token: null,
        name: null,
        email: null,
        transfer_id: null,
    }

    return { initialStateAuth }
}

export default useAuthInitialStates
