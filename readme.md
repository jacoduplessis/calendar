# Calendar

The 7Kb JavaScript calendar.

You worked so hard to keep your app small. And then came the manager's request to add a calendar.
Shit. Now you need Moment and jQuery and all your self-discipline means nothing. Until now.

The purpose of this library is to render 'events'. It offers a `calendar` view as well
as a `list` view.

In order to avoid confusion with JavaScript events, calendar 'events' are known 
as `entries` (singular: `entry`) in the code base and API.

## Demos

[Basic Usage](https://jacoduplessis.github.io/calendar/demo/basic.html)

[Editor Plugin](https://jacoduplessis.github.io/calendar/demo/editor.html)

[Display Trello Board](https://jacoduplessis.github.io/calendar/demo/trello.html)

## Usage

```html
<div id="calendar"></div>
<script src="calendar.js"></script>
<script>
  var calendar = new Calendar({
    target: document.querySelector("#calendar"),
    data: {
      entries: [{
        dateFrom: '2017-10-10',
        title: 'Hallo',
        content: 'World'
      }]
    }
  })
</script>

```

## Data Object

### `monthNames` [Array]

Names of the months to display in the header.

default: `["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]`

### `dayNames` [Array]

Names of the days to display in calendar header. Week starts on Sunday.

default: `["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]`

### `entries` [Array]

Entries to display. See `Entry Object` below.

Default: `[]`

### `month` [Integer]

Along with `year` determines which month is displayed.

Default: current month

### `year` [Integer]

Along with `month` determines which month is displayed.

Default: current year

### `escape` [Boolean]

Whether to escape the `content` field of the event. Set to `false` if you need to display HTML in the modal. Needless to say, you need to sanitize user generated content server-side.

Default: `true`

### `showNew` [Boolean]

Whether to show the New Event click area on the calendar.

Default: `false`

### `previousText` [String]

Text to display on the button that goes back in time.

Default: `"Prev"`

### `nextText` [String]

Text to display on the button that goes forward in time.

Default: `"Next"`

### `calendarText` [String]

Text to display on the button that enables the calendar view.

Default: `"Calendar"`

### `listText` [String]

Text to display on the button that enables the list view.

Default: `"List"`

### `emptyText` [String]

Text to display when list view is empty.

Default: `"No Events To Display"`

### `untitledText` [String]

Text to display when entry title is empty.

Default: `"Untitled"`

### `view` [String]

The initial render mode. Must be one of `"calendar"` or `"list"`.

Default: `"calendar"`

### `defaultColor` [String]

Default entry color. Can be overwritten per entry. Text color will adapt to
create contrast.

Default: `"darkblue"`

### `message` [String]

Message to display in the header, useful for indication loading status.

### `banner` [String]

Display an important notification to the user, such as connections errors.

## Entry Object

Each entry may have the following keys:

### `start` [String] **required**

The starting date/time in ISO8601 format and UTC timezone, e.g. 2017-01-01T10:00:00Z.

### `end` [String]

The ending date/time in ISO8601 format and UTC timezone, e.g. 2017-01-01T10:00:00Z.
If omitted, will be the same as `start`, and `allDay` will be `false`.

### `all_day` [Boolean]

Whether to use only the date component of `start`/`end`. 

### `title` [String]

Title of the entry.

Default: `""`

### `content` [String]

Content to display when modal is opened. Can contain
HTML if `escape` is set to `false` in calendar options.

### `color` [String]

CSS color to associate with this entry. Do not use named colors - a hex code is required.

Default: `"#00008b"` (`darkblue`)

### `image` [String]

URL of an image to display in the modal.

### `url` [String]

External link.

## Calendar API

### `.set(data)`

This updates the calendar's state with the new values provided and causes the DOM to update.

Usage:

```js
calendar.set({events: [...]}) // update events

calendar.set({year: 2018, month: 1}) // jump to Feb 2018 (months are zero-indexed)
```

### `.get(key)`

Get calendar state.

Usage:

```js
var entries = calendar.get('entries')
```

### `.observe(key, callback[, options])`

Use this to check when the calendar display is changed, 
possible fetching new entry data and updating the calendar with
`.set`.

Usage:

```js
calendar.observe('month', function(newMonth, oldMonth) {
  console.log("Month changed from", oldMonth, "to", newMonth)
  console.log("Year is", cal.get('year'))
  fetch(`/entries/?year=${cal.get('year')}&month=${newMonth}`).then(r => r.json()).then(data => {
    const entries = cal.get('entries')
    cal.set({entries: entries.concat(data.entries)})
  })
})
```

### `.destroy()`

Removes the component from the DOM and removes any observers and event listeners that were created. 

Usage:

```js
calendar.destroy()
```

### `.on(event, callback)`

Respond to events. See events below.

## Trigger the modal

```js
calendar.set({showModal: true})
```


## Access to DOM Nodes

Certain nodes van be reference using the `refs` property of the calendar.

### `modalContent`

Usage:

```js
calendar.refs.modalContent.innerHTML = '<h1>Custom Modal Content</h1>'
calendar.set({showModal: true})
```

## Events

### `entryClicked`

Called when an entry is clicked/tapped in calendar view.

Usage:

```js
calendar.on('entryClicked', function(event) {
  console.log(event.entry)
})
```

### `newClicked`

Called when the New Entry area is clicked/tapped in calendar view.

Usage:

```js
calendar.on('newClicked', function(event) {
  calendar.refs.modalContent.innerHTML = '<h1>Add New Event</h1>'
  calendar.set({showModal: true})
})
```

## Translation

All strings can be overwritten in the options, so if you need
something other than English, just pass in the translated strings.

## Custom Modal Buttons

```js

calendar.set({
  modalButtons: [
    {id:'do-something', text: 'Click Me'}
  ]
})

calendar.on('do-something', function(event) {
  console.log(event.entry)
})
```

## Todo

Editor plugin form validation
