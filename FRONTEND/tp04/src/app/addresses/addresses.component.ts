import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Address } from '../address';
import { SetBillingAddress, SetPostalAddress } from '../user.action';
import { UserState } from '../user.state';
import { User } from '../user.state.model';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {
  @Select(UserState.GetLoggedUser) loggedUser$: Observable<User>;
  @Select(UserState.GetLoggedUserAddresses) addresses$: Observable<Address[]>;
  @Select(UserState.GetLoggedUserPostalAddress) postalAddress$: Observable<Address>;
  @Select(UserState.GetLoggedUserBillingAddress) billingAddress$: Observable<Address>;
  constructor(private store: Store) { }

  ngOnInit() {
  }

  setPostalAddress(address: Address): void {
    let loggedUser = undefined;
    const sub = this.loggedUser$.pipe(take(1)).subscribe(
      value => loggedUser = value
    );
    sub.unsubscribe();
    this.store.dispatch(new SetPostalAddress(loggedUser, address));
  }

  setBillingAddress(address: Address): void {
    let loggedUser = undefined;
    const sub = this.loggedUser$.pipe(take(1)).subscribe(
      value => loggedUser = value
    );
    sub.unsubscribe();
    this.store.dispatch(new SetBillingAddress(loggedUser, address));
  }

}
