/**
 * @flow
 */

"use strict";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { logger } from "redux-logger";
import promise from "./promise";
import reducers from "../reducers";

var store = applyMiddleware(thunk, promise, logger)(createStore)(reducers);

export default store;
