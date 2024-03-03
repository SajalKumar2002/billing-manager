import CreateContext from '../CreateContext';
import AsyncStorage from "@react-native-async-storage/async-storage";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

function productReducer(state, action) {
    switch (action.type) {
        case 'ADD_PRODUCT':
            return [
                ...state,
                action.payload
            ];
        case 'EDIT_PRODUCT':
            return state.map(item => {
                return item.id === action.payload.id ? action.payload : item;
            })
        case 'DELETE_PRODUCT':
            return state.filter(item => (
                item.id !== action.payload
            ))
        case 'DELETE_ALL_PRODUCT':
            return action.payload;
        case 'GET_ALL_PRODUCTS':
            return action.payload;
        default:
            throw new Error("Unhandled action type in reducer");
    }
}

export const getProduct = (dispatch) => {
    return async (id) => {
        const response = await AsyncStorage.getItem(`${id}`);

        dispatch({ type: 'GET_PRODUCTS', payload: JSON.parse(response) })
    }
}

export const addProduct = (dispatch) => {
    return async (value, callback) => {
        const id = uuidv4() + "p";
        const jsonValue = {
            ...value, id
        }
        await AsyncStorage.setItem(id, JSON.stringify(jsonValue))

        dispatch({ type: 'ADD_PRODUCT', payload: jsonValue })
        if (callback) {
            callback();
        }
    }
}

export const updateProduct = (dispatch) => {
    return async (value, callback) => {
        const { id } = value;
        // console.log(id);
        await AsyncStorage.setItem(`${id}`, JSON.stringify(value));

        dispatch({ type: "EDIT_PRODUCT", payload: value })
        if (callback) {
            callback();
        }
    }
}

export const deleteProduct = (dispatch) => {
    return async (id) => {
        await AsyncStorage.removeItem(`${id}`);

        dispatch({ type: 'DELETE_PRODUCT', payload: id })
    }
}

export const getAllProducts = (dispatch) => {
    return async () => {
        const key = await AsyncStorage.getAllKeys();
        if (key.length !== 0) {
            const productKey = key.filter(item => item.endsWith("p"))
            const products = await AsyncStorage.multiGet(productKey);
            const product = products.map((item) => {
                return JSON.parse(item[1])
            })
            dispatch({ type: 'GET_ALL_PRODUCTS', payload: product })
        }
    }
}

export const clearAllProducts = (dispatch) => {
    return async (callback) => {
        const key = await AsyncStorage.getAllKeys();
        if (key.length !== 0) {
            const productKey = key.filter(item => item.endsWith("p"));
            await AsyncStorage.multiRemove(productKey);

            dispatch({ type: 'DELETE_ALL_PRODUCT', payload: [] })
            console.log("Cleared Products");
        }
        if (callback) {
            callback();
        }
    }
}

export const { Context, Provider } = CreateContext(
    productReducer,
    {
        getProduct,
        addProduct,
        updateProduct,
        deleteProduct,
        getAllProducts,
        clearAllProducts
    },
    []
)