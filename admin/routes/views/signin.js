var keystone = require('../../../');
var session = require('../../../lib/session');

exports = module.exports = function(req, res) {

	function renderView() {
		keystone.render(req, res, 'signin', {
			submitted: req.body,
			from: req.query.from,
			logo: keystone.get('signin logo')
		});
	}

	// If a form was submitted, process the login attempt
	if (req.method === 'POST') {

		if (!keystone.security.csrf.validate(req)) {
			req.flash('error', 'Houve um erro no processamento, tente novamente depois.');
			return renderView();
		}

		if (!req.body.email || !req.body.password) {
			req.flash('error', 'Por favor preencha ambos os campos.');
			return renderView();
		}

		var onSuccess = function (user) {

			if (req.query.from && req.query.from.match(/^(?!http|\/\/|javascript).+/)) {
				res.redirect(req.query.from);
			} else if ('string' === typeof keystone.get('signin redirect')) {
				res.redirect(keystone.get('signin redirect'));
			} else if ('function' === typeof keystone.get('signin redirect')) {
				keystone.get('signin redirect')(user, req, res);
			} else {
				res.redirect('/painel');
			}

		};

		var onFail = function (err) {
			var message = (err && err.message) ? err.message : 'Sua senha ou usuario estao incorretos, por favor certifique-se de que os dados digitados estao corretos.';
			req.flash('error', message );
			renderView();
		};

		session.signin(req.body, req, res, onSuccess, onFail);

	} else {
		renderView();
	}

};
