# Calendar

The 7Kb JavaScript calendar.

## Demo

[https://jacoduplessis.github.io/calendar/](https://jacoduplessis.github.io/calendar/)

## Usage

```html
<div id="calendar"></div>
<script src="calendar.js"></script>
<script>
  var calendar = new Calendar({
    target: document.querySelector("#calendar"),
    data: {
      escape: false,
      entries: [{
        start: '2017-10-10T16:00:00',
        end: '2017-10-22',
        title: 'First Event',
        color: 'darkred',
        content: '<p>Hallo World</p>'
      }]
    }
  })
</script>

```

## Options

`monthNames` [Array]

Names of the months to display in the header.

default: `["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]`

`dayNames` [Array]

Names of the days to display in calendar header. Week starts on Sunday.

default: `["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]`

`entries` [Array]

Entries to display. See below.

Default: `[]`

`month` [Integer]

Default: current month

`year` [Integer]

Default: current year

`escape` [Boolean]

Whether to escape the `content` field of the event.

Default: `true`

`previousText` [String]

Text to display on the button that goes back in time.

Default: `"Prev"`

`nextText` [String]

Text to display on the button that goes forward in time.

Default: `"Next"`

`calendarText` [String]

Text to display on the button that enables the calendar view.

Default: `"Calendar"`

`listText` [String]

Text to display on the button that enables the list view.

Default: `"List"`

`emptyText` [String]

Text to display when list view is empty.

Default: `"No Events To Display"`

`view` [String]

The initial render mode. Must be one of `"calendar"` or `"list"`.

Default: `"calendar"`

`defaultColor` [String]

Default entry color. Can be overwritten per entry. Should be a dark
color as text will be white.

Default: `"darkblue"`

## Entry Object

Each entry may have the following keys:

`start` [String] **required**

The starting date/time of the entry in ISO 8601 format.
Must be of the format `YYYY-MM-DD` or `YYYY-MM-DDTHH:MM:SS`.

`end` [String]

The ending date/time of the entry in ISO 8601 format.
Must be of the format `YYYY-MM-DD` or `YYYY-MM-DDTHH:MM:SS`.

`title` [String]

Title of the entry.

Default: `""`

`content` [String]

Content to display when modal is opened. Can contain
HTML if `escape` is set to `false` in calendar options.

`color` [String]

CSS color to associate with this entry. 

Default: `"darkblue"`

## Calendar API

`.set(data)`

This updates the calendar's state with the new values provided and causes the DOM to update.

```js
calendar.set({events: [...]}) // update events

calendar.set({year: 2018, month: 1}) // jump to Feb 2018
```


`.get(key)`

Get calendar state.

```js
const events = calendar.get('events')
```

`.observe(key, callback[, options])`

Use this to check when the calendar display is changed, 
possible fetching new event data and updating the calendar with
`.set`.

```js
calendar.observe('month', function(newMonth, oldMonth) {
  console.log("Month changed from", oldMonth, "to", newMonth)
  console.log("Year is", cal.get('year'))
})
```

`.destroy()`

Removes the component from the DOM and removes any observers and event listeners that were created. 

```js
calendar.destroy()
```

## Translation

All strings can be overwritten in the options, so if you need
something other than English, just pass in the translated strings.
