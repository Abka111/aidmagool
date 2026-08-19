import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const NotFound = () => (
  <section className="section section--paper not-found">
    <div className="shell shell--narrow">
      <p className="eyebrow">
        <span className="eyebrow-rule" aria-hidden="true" />
        Error 404
      </p>
      <h1 className="page-title">This page could not be found.</h1>
      <p className="page-lead">
        The link may be out of date, or the page may have moved. Start again from the homepage, or
        browse the latest field notes.
      </p>
      <div className="hero-actions">
        <Link to="/" className="btn btn--primary">
          Back to home
          <ArrowRight aria-hidden="true" />
        </Link>
        <Link to="/blog" className="btn btn--underline">
          Read the blog
          <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </div>
  </section>
);

export default NotFound;
