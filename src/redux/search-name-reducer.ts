const initialState: InitialStateType = {
    formValue:''
}

export const searchNameReducer = (state: InitialStateType = initialState, action: AllSearchReducerActionsType): InitialStateType => {
    switch (action.type) {
        case "SET-FORM-VALUE": {
            return {...state,formValue:action.value}
        }
        default:
            return state
    }
}

export type AllSearchReducerActionsType = SetFormValueActionType

export const SetFormValueAC = (value: string) => {
    return {type: "SET-FORM-VALUE", value} as const
}

//types
type InitialStateType = {
        formValue:string
    }
export type SetFormValueActionType = ReturnType<typeof SetFormValueAC>
