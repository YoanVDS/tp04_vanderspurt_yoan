import { isNgTemplate } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, StateStream, Store } from "@ngxs/store"
import { AddAddress, RemoveAddress,  AddUser, RemoveUser, SetLoggedUser, SetPostalAddress, SetBillingAddress} from "./user.action"
import { UserStateModel, User } from "./user.state.model"

@State<UserStateModel>({
    name: 'users',
    defaults: {
        users: [],
        loggedUser: null
    }
})

@Injectable()
export class UserState{
    @Selector()
    static GetUsers(state: UserStateModel){
        return state.users;
    }

    @Selector()
    static GetNbUsers(state: UserStateModel) {
        return state.users.length;
    }

    @Selector()
    static GetUser(state: UserStateModel, nickname: string, password: string){
        state.users.forEach(element => {
            if(element.nickname == nickname && element.password == password) return element;
        });
    }

    @Selector()
    static GetLoggedUser(state: UserStateModel){
        return state.loggedUser;
    }

    @Selector()
    static GetLoggedUserAddresses(state: UserStateModel){
        return state.loggedUser.addresses;
    }

    @Selector()
    static GetLoggedUserPostalAddress(state: UserStateModel){
        return state.loggedUser.postalAddress;
    }

    @Selector()
    static GetLoggedUserBillingAddress(state: UserStateModel){
        return state.loggedUser.billingAddress;
    }



    @Selector()
    static GetLoggedUserNick(state: UserStateModel){
        return state.loggedUser.nickname;
    }

    @Action(AddUser)
        addUser({getState, patchState}: StateContext<UserStateModel>, {payload} : AddUser){
            const state = getState();
            patchState({
                users: [...state.users, payload]
            });
        }

    @Action(AddAddress)
        addAddress({userPayload, addressPayload} : AddAddress){
            userPayload.addresses.push(addressPayload);
        }

    @Action(RemoveAddress)
        removeAddress({userPayload, addressPayload} : AddAddress){
            userPayload.addresses.filter(item =>
                item.address != addressPayload.address
            &&  item.city != addressPayload.city
            &&  item.country != addressPayload.country
            &&  item.zip != addressPayload.zip);
        }

    @Action(RemoveUser)
        removeUser({getState, patchState}: StateContext<UserStateModel>, {payload}: RemoveUser){
            const state = getState();
            patchState({
                users: state.users.filter(
                    item => item.nickname != payload.nickname
                )
            })
        }

    @Action(SetLoggedUser)
        setLoggedUser({getState, patchState}: StateContext<UserStateModel>, {payload}: SetLoggedUser){
            patchState({
                loggedUser: payload
            })
        }

    @Action(SetPostalAddress)
        setPostalAddress({userPayload,addressPayload}: SetPostalAddress){
            userPayload.postalAddress = addressPayload;
        }

    @Action(SetBillingAddress)
        setBillingAddress({userPayload,addressPayload}: SetBillingAddress){
            userPayload.billingAddress = addressPayload;
        }
}