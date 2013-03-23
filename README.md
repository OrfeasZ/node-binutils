binutils - .NET like BinaryReader and BinaryWriter for node.js
==============================================================

These utilities provide you with a BinaryReader and BinaryWriter class with functions similar to the corresponding .NET classes.
They also allow you to define a specific endianness!

Basic installation and usage
----------------------------

You can install this package either by using npm or by downloading the source from GitHub and requiring it directly.

To install using npm open your terminal (or command line), make sure you're in your application directory and execute the following command:

    npm install binutils
    
You can then start using the package by requiring it from your application as such:

    var binutils = require('binutils');
    
BinaryReader Class
------------------

### BinaryReader(inputBuffer, endianness, encoding)

* Initializes a BinaryReader with the specified settings
* inputBuffer can be a `Buffer`, a `string` or an `array`

### ReadUInt8()

* Reads a 8 bit unsigned integer from the buffer and advances the current position by 1 byte

### ReadUInt16()

* Reads a 16 bit unsigned integer from the buffer and advances the current position by 2 bytes

### ReadUInt32()

* Reads a 32 bit unsigned integer from the buffer and advances the current position by 4 bytes

### ReadInt8()

* Reads a 8 bit signed integer from the buffer and advances the current position by 1 byte

### ReadInt16()

* Reads a 16 bit signed integer from the buffer and advances the current position by 2 bytes

### ReadInt32()

* Reads a 32 bit signed integer from the buffer and advances the current position by 4 bytes

### ReadFloat()

* Reads a float from the buffer and advances the current position by 4 bytes

### ReadDouble()

* Reads a double from the buffer and advances the current position by 8 bytes

### ReadBytes(count)

* Reads the specified number of bytes into a new buffer and advances the current position by that number of bytes 

### Length [Number]

* The length of the initially provided data

### Position [Number]

* The current position (index) of the reader

### ByteBuffer [Buffer]

* A buffer containing the remaining data from the original buffer

BinaryWriter Class
------------------

### BinaryWriter(endianness, encoding)

* Initializes a BinaryWriter with the specified settings

### WriteUInt8(value)

* Writes a 8 bit unsigned integer to the buffer and advances the current position by 1 byte

### WriteUInt16(value)

* Writes a 16 bit unsigned integer to the buffer and advances the current position by 2 bytes

### WriteUInt32(value)

* Writes a 32 bit unsigned integer to the buffer and advances the current position by 4 bytes

### WriteInt8(value)

* Writes a 8 bit signed integer to the buffer and advances the current position by 1 byte

### WriteInt16(value)

* Writes a 16 bit signed integer to the buffer and advances the current position by 2 bytes

### WriteInt32(value)

* Writes a 32 bit signed integer to the buffer and advances the current position by 4 bytes

### WriteFloat(value)

* Writes a float to the buffer and advances the current position by 4 bytes

### WriteDouble(value)

* Writes a double to the buffer and advances the current position by 8 bytes

### WriteBytes(value)

* Reads the specified number of bytes into a new buffer and advances the current position by that number of bytes
* value can be a `Buffer`, a `string` or an `array`

### Length [Number]

* The length of the current data buffer

### ByteBuffer [Buffer]

* A buffer containing the data written using the class functions

Example
-------

```javascript
var binutils = require('./binutils.js');

var buffer = new Buffer([1,  0, 2,  0, 0, 0, 3,  1, 2, 3, 4, 5, 6]);

var reader = new binutils.BinaryReader(buffer);

console.log(reader.ReadUInt8()); // Will print '1'
console.log(reader.ReadUInt16()); // Will print '2'
console.log(reader.ReadUInt32()); // Will print '3'
console.log(reader.ReadBytes(6)); // Will print '<Buffer 01 02 03 04 05 06>'
console.log(reader.Position); // Will print '13'
console.log(reader.Length); // Will print '13'

//

var writer = new binutils.BinaryWriter();

writer.WriteUInt16(65535);
writer.WriteUInt32(0);
writer.WriteInt32(-1);
writer.WriteBytes([5, 4, 3, 2, 1]);

console.log(writer.ByteBuffer); // Will print '<Buffer ff ff 00 00 00 00 ff ff ff ff 05 04 03 02 01>'
console.log(writer.Length); // Will print '15'
```

TODO
----

* Add support for 64-bit integers
* Add support for strings
* Add support for booleans