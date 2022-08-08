import React from 'react';
import '../matchMedia.js';
import Enquiry from '../components/routing/Enquiry';
import renderer from 'react-test-renderer'
import {BrowserRouter as Router} from 'react-router-dom';

describe("snapshot testing", () => {
    test("snapshot for Home component", () => {
        const renderedComponent = renderer.create(
        <Router>
            <Enquiry />
        </Router>).toJSON()
        expect(renderedComponent).toMatchSnapshot()
    })
}) 