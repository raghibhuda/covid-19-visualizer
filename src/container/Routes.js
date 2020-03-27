import React from "react";
import {Switch,Route, HashRouter as Router} from 'react-router-dom';
import Overview from "./Overview";
import LatestUpdate from "./Latest";
import Graphs from "./Graphs";

const Routes = ()=>
    <Router>
    <Switch>
        <Route exact path="/" component={Overview}/>
        <Route exact path="/latest-update" component={LatestUpdate}/>
        <Route exact path="/graphs" component={Graphs}/>
    </Switch>
    </Router>;

export default Routes;