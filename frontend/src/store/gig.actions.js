// import { gigService } from '../services/gig.service.local.js'
import { gigService } from "../services/gig.service.js";
import { userService } from "../services/user.service.js";
import { store } from "./store.js";
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js";
import {
  ADD_GIG,
  ADD_TO_CART,
  CLEAR_CART,
  REMOVE_GIG,
  REMOVE_FROM_CART,
  SET_GIGS,
  UNDO_REMOVE_GIG,
  UPDATE_GIG,
  SET_ORDERS_PREVIEW,
} from "./gig.reducer.js";
// import { SET_SCORE } from "./user.reducer.js";
import { SET_FILTER } from "./filter.reducer.js";
// Action Creators:
export function getActionRemoveGig(gigId) {
  return {
    type: REMOVE_GIG,
    gigId,
  };
}
export function getActionAddGig(gig) {
  return {
    type: ADD_GIG,
    gig,
  };
}
export function getActionUpdateGig(gig) {
  return {
    type: UPDATE_GIG,
    gig,
  };
}

export async function loadGigs(filterBy) {
  try {
    const gigs = await gigService.query(filterBy);
    // console.log('Gigs from DB:', gigs)
    store.dispatch({
      type: SET_GIGS,
      gigs,
    });
  } catch (err) {
    console.log("Cannot load gigs", err);
    throw err;
  }
}

export async function removeGig(gigId) {
  try {
    await gigService.remove(gigId);
    store.dispatch(getActionRemoveGig(gigId));
  } catch (err) {
    console.log("Cannot remove gig", err);
    throw err;
  }
}

export async function addGig(gig) {
  try {
    const savedGig = await gigService.save(gig);
    console.log("Added Gig", savedGig);
    store.dispatch(getActionAddGig(savedGig));
    return savedGig;
  } catch (err) {
    console.log("Cannot add gig", err);
    throw err;
  }
}

export async function updateGig(gig) {
  try {
    const savedGig = await gigService.save(gig);
    console.log("Updated Gig:", savedGig);
    store.dispatch(getActionUpdateGig(savedGig));
    return savedGig;
  } catch (err) {
    console.log("Cannot save gig", err);
    throw err;
  }
}

export function addToCart(gig) {
  store.dispatch({
    type: ADD_TO_CART,
    gig,
  });
}

export function removeFromCart(gigId) {
  store.dispatch({
    type: REMOVE_FROM_CART,
    gigId,
  });
}

// export async function checkout(total) {
//   try {
//     const score = await userService.changeScore(-total);
//     // store.dispatch({ type: SET_SCORE, score });
//     store.dispatch({ type: CLEAR_CART });
//     return score;
//   } catch (err) {
//     console.log("GigActions: err in checkout", err);
//     throw err;
//   }
// }

export function setFilter(filterBy) {
  // console.log('filterBy', filterBy);
  store.dispatch({ type: SET_FILTER, filterBy });
}
