let loginBrowser;

mp.events.add('passwordToServer', (password) => {
    mp.events.callRemote('verifyPassword', password);
});

mp.events.add('showLogin', () => {
    loginBrowser = mp.browsers.new('package://division-core/ui/password.html');
    mp.gui.cursor.show(true, true);
});

mp.events.add('hideLogin', () => {
    loginBrowser.destroy();
    loginBrowser = null;
    mp.gui.chat.activate(true);
    mp.gui.cursor.show(false, false);
});

mp.events.add('loginError', () => {
    loginBrowser.execute(`$('.alert-danger').show(); $('#inputPassword').val('');`);
})