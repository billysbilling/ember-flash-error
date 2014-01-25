module.exports = Em.Component.extend({
    template: require('../templates/flash-error'),

    classNames: ['flash-error'],

    containerSelector: 'body',
    
    classNameBindings: ['error:has-error'],
    
    record: null,
    
    error: Em.computed.oneWay('record.error'),

    _getCt: function() {
        return this.$().closest(this.get('containerSelector'));
    },

    _setup: function() {
        var el = this.$(),
            ct = this._getCt();
        ct.addClass('flash-error-ct');
        el.css({
            'padding-left': ct.css('padding-left'),
            'padding-right': ct.css('padding-right')
        });
        //We have to move this view to the container, to make sure that it's positioned correctly
        ct.append(el);
    }.on('didInsertElement'),

    _teardown: function() {
        var ct = this._getCt();
        ct.removeClass('flash-error-ct');
    }.on('willDestroyElement'),
    
    _errorDidChange: function() {
        Em.run.scheduleOnce('afterRender', this, this._adjustCtPadding);
        Em.run.scheduleOnce('afterRender', this, this._scrollIntoView);
    }.observes('error'),

    _adjustCtPadding: function() {
        if (this.get('isDestroying')) {
            return;
        }
        var ct = this._getCt();
        if (Em.isEmpty(this._originalCtPadding)) {
            this._originalCtPadding = +(ct.css('padding-top') || '0').replace('px', '');
        }
        if (this.get('error')) {
            var padding = this._originalCtPadding + this.$().outerHeight();
            ct.css('padding-top', padding + 'px');
        } else {
            ct.css('padding-top', this._originalCtPadding + 'px');
        }
    },

    _scrollIntoView: function() {
        //TODO
    }
});