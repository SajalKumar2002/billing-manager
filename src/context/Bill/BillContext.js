import CreateContext from '../CreateContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

function billReducer(state, action) {
    switch (action.type) {
        case "ADD_BILL":
            return [
                ...state,
                action.payload
            ];
        case "EDIT_BILL":
            return state.map(bill => (
                bill.id === action.payload.id ? action.payload : bill
            ));
        case "DELETE_BILL":
            return state.filter(item => item.id !== action.payload.id)
        case "DELETE_ALL_BILL":
            return action.payload;
        case "GET_ALL_BILL":
            return action.payload;
        default:
            throw new Error("Unhandled action type in reducer");
    }
}

export const getBill = (dispatch) => {
    return async (id) => {
        const response = await AsyncStorage.getItem(`${id}`);

        dispatch({ type: 'GET_BILL', payload: JSON.parse(response) })
    }
}

export const addBill = (dispatch) => {
    return async (value, callback) => {
        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const formattedMonth = month < 10 ? '0' + month : month;

        const date = day + "/" + formattedMonth
        const id = uuidv4() + "b";
        const jsonValue = {
            ...value,
            id,
            date
        }
        await AsyncStorage.setItem(`${id}`, JSON.stringify(jsonValue))

        dispatch({ type: 'ADD_BILL', payload: jsonValue })
        if (callback) {
            callback();
        }
    }
}

export const updateBill = (dispatch) => {
    return async (value, callback) => {
        const { id } = value;
        await AsyncStorage.setItem(`${id}`, JSON.stringify(value));

        dispatch({ type: 'EDIT_BILL', payload: value })
        if (callback) {
            callback();
        }
    }
}

export const deleteBill = (dispatch) => {
    return async (id) => {
        await AsyncStorage.removeItem(`${id}`);

        dispatch({ type: 'DELETE_BILL', payload: id });
    }
}

export const getAllBills = (dispatch) => {
    return async () => {
        const key = await AsyncStorage.getAllKeys();
        if (key.length !== 0) {
            const billKey = key.filter(item => item.endsWith("b"));
            const bills = await AsyncStorage.multiGet(billKey);
            const bill = bills.map((item) => {
                return JSON.parse(item[1])
            })
            dispatch({ type: 'GET_ALL_BILL', payload: bill })
        }
    }
}

export const clearAllBills = (dispatch) => {
    return async () => {
        const key = await AsyncStorage.getAllKeys();
        if (key.length !== 0) {
            const billKey = key.filter(item => item.endsWith("b"));
            await AsyncStorage.multiRemove(billKey);

            dispatch({ type: 'DELETE_ALL_BILL', payload: [] })
            console.log("Cleared Product");
        }
        if (callback) {
            callback();
        }
    }
}

export const { Context, Provider } = CreateContext(
    billReducer,
    {
        getBill,
        deleteBill,
        updateBill,
        getAllBills,
        addBill,
        clearAllBills
    },
    []
)

// const billReducer = (state, action) => {
//     switch (action.type) {
//         case 'SET_BILLS':
//             return action.payload;
//         case 'ADD_BILL':
//             const id = Math.floor(Math.random() * 999999);
//             const newAddValue = {
//                 id: id,
//                 date: `${DATE.getDate()}/${DATE.getMonth() + 1}`,
//                 products: action.payload.products,
//                 customerName: action.payload.customerName,
//                 amount: action.payload.amount
//             }
//             setData(newAddValue)
//             if (getData(id))
//                 return [
//                     ...state, newAddValue
//                 ];
//             return state;
//         case 'DELETE_BILL':
//             if (deleteData(action.payload.id))
//                 return state.filter((item) => item.id !== action.payload.id);
//             return state;
//         case 'UPDATE_BILL':
//             const newSetValue = {
//                 id: action.payload.id,
//                 date: `${DATE.getDate()}/${DATE.getMonth() + 1}`,
//                 products: action.payload.products,
//                 customerName: action.payload.customerName,
//                 amount: action.payload.amount
//             }
//             if (updateData(newSetValue).length !== 0) {
//                 return state.map((item) => {
//                     if (item.id === action.payload.id) {
//                         return newSetValue;
//                     }
//                     return item;
//                 })
//             }
//             return state;
//         case 'CLEAR_BILL':
//             clearAllData();
//             return [];
//         default:
//             throw new Error("Unhandled action type in reducer");
//     }
// }