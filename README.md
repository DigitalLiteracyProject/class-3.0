# class-3.0

## Getting Started (for developers)

### General Structure
**class-3.0** is one large [Django](https://www.djangoproject.com/) project split up into multiple parts.

First, we make the distinction between *backends* and *frontends*. Then,
* Within *backends* are multiple Django apps (see [here](https://docs.djangoproject.com/en/1.10/intro/tutorial01/#creating-the-polls-app) for distinction between "app" and "project")
* Within *frontends* are multiple React apps corresponding to the the backend apps.

### Setup
1. Clone this repo (or your fork of it). We'll refer to the directory you cloned it to as `class/`.
2. Setup the Python/Django tools and environment
    1. Ensure you have `Python 3` (and not `Python 2`).
        * Many systems come with both, try `python --version` or `python3 --version` (and also `pip --version` and `pip3 --version`) until you find the right one. We'll assume `python` and `pip` refer to the `Python 3` versions for the rest of the setup.
        * Otherwise head to https://www.python.org/downloads/release/latest or your system's package manager to install the latest.
    2. Install `virtualenv`.
        * Virtualenv is a python utility that allows us to isolate and keep track of dependencies for separate python projects
        * Run `pip install virtualenv`. If you don't have permissions, try running it in an Administrator terminal or prefixing with `sudo`. Alternatively run `pip install --user virtualenv`
    3. Create a new Virtualenv, and install the Python dependencies
        * cd to `class/`
        * execute `virtualenv venv` to make a new Virtualenv called venv
        * run `source venv/bin/activate` (or `venv\Scripts\activate` on Windows) to activate/enter into the Virtualenv
        * then `pip install -r requirements.txt`; this will install dependencies into the venv
3. Setup the JavaScript/Webpack/React tools and environment
    1. Ensure you have Node and NPM
        * You can check with `node --version` (or potentially `nodejs --version`) and `npm --version`.
        * Otherwise head to https://nodejs.org/en/ or your system's package manager to install the latest.
    2. Install the JavaScript dependencies and toolchain
        * cd to `class/frontends/`
        * run `npm install`; this will install dependencies into a directory called `node_modules`

### Running everything
1. Remember to `git pull` (or `git fetch` followed by merge/rebase) the latest changes!
2. Running the frontend development toolchain
    1. Remember
        * if any dependency problems arise, cd to `class/frontends`, and re-run `npm install` as dependencies may have changed
    2. cd to `class/frontends`
    3. run `npm run dev` to run a continuously-building development server that will auto-rebuild upon file changes
    4. or `npm run build` to build a highly-optimized version once
3. Running the backend
    1. Remember
        * activate the venv (once per terminal) before executing anything related to Python
        * build the frontend at least once (so that the server will have something to serve!)
        * if any dependency problems arise, activate the venv, cd to `class/`, and re-run `pip install -r requirements.txt` as dependencies may have changed
    2. cd to `class/backends`
    3. run `python manage.py runserver` to run the server and make it accessible (via a browser) at `http://127.0.0.1:8000`

### Structure of an app
An app called *foobar* would have various components like
* A line `'foobar.Foobar'` in the `INSTALLED_APPS` list of `class/backends/class/settings.py`
* An entry `url(r'^foobar/', include('foobar.urls'))` in `class/backends/class/urls.py`
* The Django app directory `class/backends/foobar`, and inside
    * `__init__.py` containing a `class Foobar(AppConfig)` definition
    * `admin.py` containing Django admin panel registration
    * `models.py` containing the database models used by the app
    * `urls.py` containing routes used by the app
    * `view.py` containing most of the backend code for the app
    * `*.py` (other supporting files)
    * potentially a `templates/foobar` directory containing custom templates (remember that the `core` app has shared useful templates that apps should try to use as much as possible)
* A line `foobar: './foobar/index.js'` in the `entry` definition in `class/frontends/webpack.config.js`
* The React app directory `class/frontends/foobar`, and inside
    * `index.js` containing routes, CSS imports, and the base component of the app.
    * `*.js` and `*.css` (other supporting files and components)

Remember that apps should use as much stuff from the `core` app as possible to promote interoperability and reduce redundancy.
For instance, the `core` app provides a basic React-loading `index.html` template, obviating the need for most apps to provide their own templates.
