var React = require('react');
var classNames = require('classnames');

var Button = require('elemental').Button;
var Dropdown = require('elemental').Dropdown;
var FormInput = require('elemental').FormInput;
var InputGroup = require('elemental').InputGroup;
var Tag = require('elemental').Tag;

const CURRENT_FILTERS = [
	'Created Date between 21/08/2014 and 21/09/2014',
	'Email contains "@gmail"',
	'Is NOT Admin',
	'School: Surry Hills Primary School'
];

const SORT_OPTIONS = [
	{ label: 'Name' },
	{ label: 'Listing Type' },
	{ label: 'Place' },
	{ label: 'Listing State' },
	{ label: 'Created At' }
];

var ListHeader = React.createClass({
	
	displayName: 'ListHeader',
	
	getInitialState: function() {
		return {
			searchString: ''
		};
	},

	handleFilterClick: function(filter) {
		return console.log('clicked:', filter);
	},
	handleFilterClear: function(filter) {
		return console.log('cleared:', filter);
	},
	handleSearch: function(e) {
		this.setState({
			searchString: e.target.value
		});
	},
	handleSearchClear: function(e) {
		this.setState({
			searchString: ''
		});
		React.findDOMNode(this.refs.listSearchInput).focus();
	},
	
	renderTitle: function() {
		return (
			<h2 className="ListHeader__title">7287 Events sorted by name</h2>
		);
	},
	renderRecentFilters: function() {
		return (
			<InputGroup.Section>
				<Dropdown items={[{ label: 'Listing state matches "published"' },{ label: 'Email matches "gmail"' }]}>
					<Button title="Recent Filters">
						<span className="octicon octicon-clock" />
					</Button>
				</Dropdown>
			</InputGroup.Section>
		);
	},
	renderSearch: function() {
		var searchClearIcon = classNames('ListHeader__searchbar-field__icon octicon', {
			'is-search octicon-search': !this.state.searchString.length,
			'is-clear octicon-x': this.state.searchString.length
		});
		return (
			<InputGroup.Section grow className="ListHeader__searchbar-field">
				<FormInput ref="listSearchInput" value={this.state.searchString} onChange={this.handleSearch} placeholder="Search" className="ListHeader__searchbar-input" />
				<button ref="listSearchClear" type="button" onClick={this.handleSearchClear} disabled={!this.state.searchString.length} className={searchClearIcon} />
			</InputGroup.Section>
		);
	},
	renderFilterButton: function() {
		return (
			<InputGroup.Section>
				<Button type="primary">
					<span className="octicon octicon-settings" />
					<span className="hidden-xs">Add Filter</span>
				</Button>
			</InputGroup.Section>
		);
	},
	renderColumnsButton: function() {
		return (
			<InputGroup.Section>
				<Button>
					<span className="octicon octicon-mirror" />
					<span className="hidden-xs">Columns</span>
				</Button>
			</InputGroup.Section>
		);
	},
	renderSortButton: function() {
		return (
			<InputGroup.Section>
				<Dropdown alignRight items={SORT_OPTIONS}>
					<Button>
						<span className="octicon octicon-list-ordered" />
						<span className="hidden-xs">Sort</span>
					</Button>
				</Dropdown>
			</InputGroup.Section>
		);
	},
	renderFilters: function() {
		var self = this;

		var currentFilters = CURRENT_FILTERS.map(function(filter, i) {
			return (
				<Tag label={filter} onClick={self.handleFilterClick.bind(this, filter)} onClear={self.handleFilterClear.bind(this, filter)} type="primary" hasClearButton />
			);
		});
		currentFilters.push(<Tag label="Clear All" onClick={self.handleFilterClick.bind(this, 'Clear All')} />);
		return (
			<div className="ListHeader__filters mb-2">
				{currentFilters}
			</div>
		);
	},
	renderPagination: function() {
		return (
			<div className="ListHeader__pagination">
				<div className="count">Showing 1 to 50 of 933</div>
				<ul className="Pagination"><li className="active"><a href="/keystone/listings/1">1</a></li><li><a href="/keystone/listings/2">2</a></li><li><a href="/keystone/listings/3">3</a></li><li><a href="/keystone/listings/4">4</a></li><li><a href="/keystone/listings/5">5</a></li><li><a href="/keystone/listings/6">6</a></li><li><a href="/keystone/listings/7">7</a></li><li><a href="/keystone/listings/8">8</a></li><li><a href="/keystone/listings/9">9</a></li><li><a href="/keystone/listings/10">10</a></li><li><a href="/keystone/listings/19">...</a></li></ul>
			</div>
		);
	},
	
	render: function() {
		return (
			<div className="ListHeader">
				<div className="container">
					{this.renderTitle()}
					<InputGroup contiguous={false} className="ListHeader__searchbar">
						{this.renderRecentFilters()}
						{this.renderSearch()}
						{this.renderFilterButton()}
						{this.renderColumnsButton()}
						{this.renderSortButton()}
					</InputGroup>
					{this.renderFilters()}
					{this.renderPagination()}
				</div>
			</div>
		);
	}
	
});

module.exports = ListHeader;