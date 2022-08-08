import React from 'react';
import '../matchMedia.js';
import NavBar from '../components/routing/NavBar';
import renderer from 'react-test-renderer'
import {BrowserRouter as Router} from 'react-router-dom';

describe("snapshot testing", () => {
    test("snapshot for Home component", () => {
        const renderedComponent = renderer.create(
        <Router>
            <NavBar />
        </Router>).toJSON()
        expect(renderedComponent).toMatchSnapshot()
    })
}) 