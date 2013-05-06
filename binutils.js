var BinaryReader = function(p_InputBuffer, p_Endianness, p_Encoding) {
    // Instantiate the buffer (if needed)
    if (p_InputBuffer instanceof Buffer) {
        this.ByteBuffer = new Buffer(p_InputBuffer);
    } else if (p_InputBuffer instanceof Array || typeof p_InputBuffer == 'string') {
        this.ByteBuffer = new Buffer(p_InputBuffer, p_Encoding);
    } else {
        throw new Error('Invalid buffer input for BinaryReader (' + typeof p_InputBuffer + ')');
    }

    // Set the endianness
    this.Endianness = p_Endianness || 'big';

    // Set the encoding
    this.Encoding = p_Encoding || 'ascii';

    // Set the length
    this.Length = this.ByteBuffer.length;

    // Set the position to 0
    this.Position = 0;
};

BinaryReader.prototype = {
    ReadUInt8: function() {
        if (this.ByteBuffer.length < 1) {
            return 0;
        }

        var s_Val = this.ByteBuffer.readUInt8(0);
        this.ByteBuffer = this.ByteBuffer.slice(1);
        ++this.Position;
        return s_Val;
    },

    ReadUInt16: function() {
        if (this.ByteBuffer.length < 2) {
            return 0;
        }

        var s_Val = (this.Endianness == 'little') ? this.ByteBuffer.readUInt16LE(0) : this.ByteBuffer.readUInt16BE(0);
        this.ByteBuffer = this.ByteBuffer.slice(2);
        this.Position += 2;
        return s_Val;
    },

    ReadUInt32: function() {
        if (this.ByteBuffer.length < 4) {
            return 0;
        }

        var s_Val = (this.Endianness == 'little') ? this.ByteBuffer.readUInt32LE(0) : this.ByteBuffer.readUInt32BE(0);
        this.ByteBuffer = this.ByteBuffer.slice(4);
        this.Position += 4;
        return s_Val;
    },

    ReadInt8: function() {
        if (this.ByteBuffer.length < 1) {
            return 0;
        }

        var s_Val = this.ByteBuffer.readInt8(0);
        this.ByteBuffer = this.ByteBuffer.slice(1);
        ++this.Position;
        return s_Val;
    },

    ReadInt16: function() {
        if (this.ByteBuffer.length < 2) {
            return 0;
        }

        var s_Val = (this.Endianness == 'little') ? this.ByteBuffer.readInt16LE(0) : this.ByteBuffer.readInt16BE(0);
        this.ByteBuffer = this.ByteBuffer.slice(2);
        this.Position += 2;
        return s_Val;
    },

    ReadInt32: function() {
        if (this.ByteBuffer.length < 4) {
            return 0;
        }

        var s_Val = (this.Endianness == 'little') ? this.ByteBuffer.readInt32LE(0) : this.ByteBuffer.readInt32BE(0);
        this.ByteBuffer = this.ByteBuffer.slice(4);
        this.Position += 4;
        return s_Val;
    },

    ReadFloat: function() {
        if (this.ByteBuffer.length < 4) {
            return 0.0;
        }

        var s_Val = (this.Endianness == 'little') ? this.ByteBuffer.readFloatLE(0) : this.ByteBuffer.readFloatBE(0);
        this.ByteBuffer = this.ByteBuffer.slice(4);
        this.Position += 4;
        return s_Val;
    },

    ReadDouble: function() {
        if (this.ByteBuffer.length < 8) {
            return 0.0;
        }

        var s_Val = (this.Endianness == 'little') ? this.ByteBuffer.readDoubleLE(0) : this.ByteBuffer.readDoubleBE(0);
        this.ByteBuffer = this.ByteBuffer.slice(8);
        this.Position += 8;
        return s_Val;
    },

    ReadBytes: function(p_Count) {
        if (p_Count > this.ByteBuffer.length) {
            return new Buffer(0);
        }

        var s_Val = new Buffer(p_Count);
        this.ByteBuffer.copy(s_Val, 0, 0, p_Count);

        this.ByteBuffer = this.ByteBuffer.slice(p_Count);

        this.Position += p_Count;
        return s_Val;
    }
};

///

var BinaryWriter = function(p_Endianness, p_Encoding) {
    // Instantiate the buffer
    this.ByteBuffer = new Buffer(0);

    // Set the endianness
    this.Endianness = p_Endianness || 'big';

    // Set the encoding
    this.Encoding = p_Encoding || 'ascii';

    // Set the length to 0
    this.Length = 0;
};

BinaryWriter.prototype = {
    WriteUInt8: function(p_Value) {
        var s_TempBuffer = new Buffer(1);
        s_TempBuffer.writeUInt8(p_Value, 0);
        this.Length += 1;
        this.ByteBuffer = Buffer.concat([this.ByteBuffer, s_TempBuffer], this.Length);
    },

    WriteUInt16: function(p_Value) {
        var s_TempBuffer = new Buffer(2);
        if (this.Endianness == 'little') {
            s_TempBuffer.writeUInt16LE(p_Value, 0);
        } else {
            s_TempBuffer.writeUInt16BE(p_Value, 0);
        }
        this.Length += 2;
        this.ByteBuffer = Buffer.concat([this.ByteBuffer, s_TempBuffer], this.Length);
    },

    WriteUInt32: function(p_Value) {
        var s_TempBuffer = new Buffer(4);
        if (this.Endianness == 'little') {
            s_TempBuffer.writeUInt32LE(p_Value, 0);
        } else {
            s_TempBuffer.writeUInt32BE(p_Value, 0);
        }
        this.Length += 4;
        this.ByteBuffer = Buffer.concat([this.ByteBuffer, s_TempBuffer], this.Length);
    },

    WriteInt8: function(p_Value) {
        var s_TempBuffer = new Buffer(1);
        s_TempBuffer.writeInt8(p_Value, 0);
        this.Length += 1;
        this.ByteBuffer = Buffer.concat([this.ByteBuffer, s_TempBuffer], this.Length);
    },

    WriteInt16: function(p_Value) {
        var s_TempBuffer = new Buffer(2);
        if (this.Endianness == 'little') {
            s_TempBuffer.writeInt16LE(p_Value, 0);
        } else {
            s_TempBuffer.writeInt16BE(p_Value, 0);
        }
        this.Length += 2;
        this.ByteBuffer = Buffer.concat([this.ByteBuffer, s_TempBuffer], this.Length);
    },

    WriteInt32: function(p_Value) {
        var s_TempBuffer = new Buffer(4);
        if (this.Endianness == 'little') {
            s_TempBuffer.writeInt32LE(p_Value, 0);
        } else {
            s_TempBuffer.writeInt32BE(p_Value, 0);
        }
        this.Length += 4;
        this.ByteBuffer = Buffer.concat([this.ByteBuffer, s_TempBuffer], this.Length);
    },

    WriteFloat: function(p_Value) {
        var s_TempBuffer = new Buffer(4);
        if (this.Endianness == 'little') {
            s_TempBuffer.writeFloatLE(p_Value, 0);
        } else {
            s_TempBuffer.writeFloatBE(p_Value, 0);
        }
        this.Length += 4;
        this.ByteBuffer = Buffer.concat([this.ByteBuffer, s_TempBuffer], this.Length);
    },

    WriteDouble: function(p_Value) {
        var s_TempBuffer = new Buffer(8);
        if (this.Endianness == 'little') {
            s_TempBuffer.writeDoubleLE(p_Value, 0);
        } else {
            s_TempBuffer.writeDoubleBE(p_Value, 0);
        }
        this.Length += 8;
        this.ByteBuffer = Buffer.concat([this.ByteBuffer, s_TempBuffer], this.Length);
    },

    WriteBytes: function(p_Value) {

        if (typeof p_Value == 'string') {
            // Ugly hack
            var s_BytesArray = [];

            for (var i = 0; i < p_Value.length; ++i) {
                s_BytesArray.push(p_Value.charCodeAt(i));
            }

            p_Value = s_BytesArray;
        }

        if (!p_Value instanceof Buffer && !p_Value instanceof Array) {
            throw new Error("Invalid Buffer object provided.");
        }

        var s_TempBuffer = (p_Value instanceof Buffer) ? p_Value : new Buffer(p_Value);

        this.Length += s_TempBuffer.length;
        this.ByteBuffer = Buffer.concat([this.ByteBuffer, s_TempBuffer], this.Length);
    }
};

// Export our classes
module.exports = {
    BinaryReader: BinaryReader,
    BinaryWriter: BinaryWriter
};