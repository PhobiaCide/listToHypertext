# listToHypertext

## Scenarios

Let's break down the expected output based on different that demonstrate how the script can handle various combinations of ordered and unordered lists, as well as blank lines, and abbreviations to generate the appropriate HTML output.

### **Scenario 1: Input Text with Consecutive Ordered List**

If the input text contains lines with consecutive numerals and periods (an ordered list format) followed by lines without numerals or periods, the output will be an ordered list followed by simple list items. Blank lines will be ignored.

For example, if the input is:

```plaintext
1. Term 1: Definition 1
2. Term 2: Definition 2
3. Term 3: Definition 3
This is a simple line
Another simple line
```

The output after using Prettier - code formatter will be:

```html
<ol>
  <li>
    <dt>Term 1:</dt>
    <dd>Definition 1</dd>
  </li>
  <li>
    <dt>Term 2:</dt>
    <dd>Definition 2</dd>
  </li>
  <li>
    <dt>Term 3:</dt>
    <dd>Definition 3</dd>
  </li>
</ol>
<ul>
  <li>This is a simple line</li>
  <li>Another simple line</li>
</ul>
```

### **Scenario 2: Input Text with Non-Consecutive Ordered List**

If the input text contains lines with numerals and periods that are not consecutive (an ordered list format) followed by lines without numerals or periods, each group of ordered list items will be treated separately as ordered lists, and the lines without numerals or periods will be simple list items. Blank lines will be ignored.

For example:

```plaintext
1. Term 1: Definition 1
4. Term 2: Definition 2
5. Term 3: Definition 3
This is a simple line
Another simple line
```

The output will be:

```html
<ol>
  <li>
    <dt>Term 1:</dt>
    <dd>Definition 1</dd>
  </li>
  <li>
    <dt>Term 2:</dt>
    <dd>Definition 2</dd>
  </li>
  <li>
    <dt>Term 3:</dt>
    <dd>Definition 3</dd>
  </li>
</ol>
<ul>
  <li>This is a simple line</li>
  <li>Another simple line</li>
</ul>
```

### **Scenario 3: Input Text with Unordered List**

If the input text contains lines with asterisks as bullet points (an unordered list format) followed by lines without any bullets, the output will be an unordered list followed by simple list items. Blank lines will be ignored.

For example:

```plaintext
Item 1
Item 2
Item 3
This is a simple line
Another simple line
```

The output will be:

```html
<ul>
  <li>This is a simple line</li>
  <li>Another simple line</li>
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
  <li>This is a simple line</li>
  <li>Another simple line</li>
</ul>
```

The script distinguishes between ordered and unordered lists based on the presence of numerals or asterisks at the beginning of the lines. Blank lines are treated as separators between different lists or simple list items.

### **Scenario 4: Mixed Ordered and Unordered Lists with Blank Line**

If the input text contains a mixture of ordered and unordered list items, along with a blank line separating them, the output will have both ordered and unordered lists, along with simple list items:

```plaintext
1. Term 1: Definition 1
Item 1
Item 2

2. Term 2: Definition 2
This is a simple line

Item 3
Another simple line
```

The output will be:

```html
<ol>
  <li>
    <dt>Term 1:</dt>
    <dd>Definition 1</dd>
  </li>
</ol>
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
<ol>
  <li>
    <dt>Term 2:</dt>
    <dd>Definition 2</dd>
  </li>
</ol>
<ul>
  <li>This is a simple line</li>
  <li>Item 3</li>
  <li>Another simple line</li>
</ul>
```

**Scenario 5: Mixed Ordered and Unordered Lists with Multiple Blank Lines**

If the input text contains multiple blank lines between different list items, the script will treat each group of ordered or unordered list items separately, followed by simple list items:

```plaintext
1. Term 1: Definition 1


* Item 1

2. Term 2: Definition 2

This is a simple line

* Item 2



Another simple line
```

The output will be:

```html
<ol>
  <li>
    <dt>Term 1:</dt>
    <dd>Definition 1</dd>
  </li>
</ol>
<ul>
  <li>Item 1</li>
</ul>
<ol>
  <li>
    <dt>Term 2:</dt>
    <dd>Definition 2</dd>
  </li>
</ol>
<ul>
  <li>This is a simple line</li>
  <li>Item 2</li>
  <li>Another simple line</li>
</ul>
```

#### **Scenario 1:** Plain Text Ordered List (`<ol></ol>`)

`Input.txt` contains an *ordered list*, indicated by a line beginning with a numeral followed by a period.

##### Example
  
`1. Term: Definition`

- The output will be an *HTML* *ordered list* (`<ol></ol>`) with each line converted to a list item (`<li></li>`).
- Lines **not** *bisected* at any point by a **colon** (`:`) will be marked up as simple list items (`<li></li>`).

#### **Scenario 2:** Plain Text Unordered List (`<ul></ul>`)

- Input.txt contains an unordered list, indicated by a line that begins with an asterisk. e.g.
  > `* {{Term}}: {{Definition}}`.
- The output will be an *HTML* **unordered list** (`<ul></ul>`) with each line converted to a list item (`<li></li>`).
- Lines not bisected by a colon (`:`) will be simple list items (`<li></li>`).

#### **Scenario 3**: Input Contains Mixed List Types

- `Input.txt` contains a mix of ordered (`<ol></ol>`) and/or unordered (`<ul></ul>`) lists.
- The script will detect the list type for each line and generate appropriate *HTML* lists accordingly.
- *Nested lists* will be *parsed*.
- Lines not bisected by a colon (`:`) will be made into simple list items (`<li></li>`).

#### **Scenario 4: Input Contains Blank Lines**

- `Input.txt` contains blank lines between *list items*.
- The script will handle the blank lines appropriately, maintaining the structure of the lists.
