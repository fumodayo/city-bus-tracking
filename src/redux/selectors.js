import { createSelector } from 'reselect'

export const searchTextSelector = state => state.filters

export const checkboxTravelSelector = state => state.checkbox

export const getIdsBusStopSelector = state => state.getIdBusStop

export const getIdsTravelLocationSelector = state => state.getIdTravelLocation

export const getLocationByInputSelector = state => state.getLocationByInput
