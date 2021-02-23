// Importando utilitários do redux.
import { createSlice } from "@reduxjs/toolkit";

const storageKey = "token";

const slice = createSlice({
    name: "login",
    initialState: {
        loading: null,
        token: localStorage.getItem(storageKey) || null,
        login: false,
        erro: null
    },
    reducers: {
        validarToken(state, action) {
            if (action.payload) {
                state.login = true;
            } else {
                localStorage.removeItem(storageKey)
                state.login = false;
            }
        },
        atualizarLogin(state, action) {
            state.login = action.payload;
        },
        atualizarToken(state, action) {
            state.token = action.payload;
        },
        atualizarLoading(state, action) {
            state.loading = action.payload;
        },
        atualizarErro(state, action) {
            state.erro = action.payload;
        }
    }
});

export const {
    tokenValidated,
    atualizarLogin,
    atualizarToken,
    atualizarLoading,
    atualizarErro
} = slice.actions;

export const fetchLogin = ({ url, options }) => async (dispatch) => {
    try {
        dispatch(atualizarErro(null));
        dispatch(atualizarLoading(true));

        const res = await fetch(url, options);
        const json = await res.json();

        if (json.auth) {
            dispatch(atualizarToken(json.token));
            window.localStorage.setItem(storageKey, json.token);
            dispatch(atualizarLogin(true));
        }

    } catch ({ message }) {
        dispatch(atualizarErro(message));
    } finally {
        dispatch(atualizarLoading(false));
    }
}

// export const logout = () => (dispatch) => {
//     dispatch(tokenValidated(false));
// }

// export const validarToken = (payload) => async (dispatch) => {
//     try {
//         if (payload) {
//             const { url, options } = VALIDAR_TOKEN(payload);
//             const res = await fetch(url, options);
//             const json = await res.json();

//             if (res.ok === false) throw new Error("Erro no fetch!");

//             dispatch(tokenValidated(json.valid));
//         } else {
//             dispatch(tokenValidated(false));
//         }
//     } catch (e) {
//         dispatch(tokenValidated(false));
//     }
// }

export default slice.reducer;
