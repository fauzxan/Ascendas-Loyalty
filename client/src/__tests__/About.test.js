import React from 'react';
import '../matchMedia.js';
import About from '../components/routing/About';
import renderer from 'react-test-renderer'
import {BrowserRouter as Router} from 'react-router-dom';

describe("snapshot testing", () => {
    test("snapshot for Home component", () => {
        const renderedComponent = renderer.create(
        <Router>
            <About />
        </Router>).toJSON()
        expect(renderedComponent).toMatchSnapshot()
    })
}) 