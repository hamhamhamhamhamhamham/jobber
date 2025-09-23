
export const serialize =<T>(data:T):Buffer=>{        // Buffer Convertor
    return Buffer.from(JSON.stringify(data))
}

export const deserialize =<T>(data:Buffer):T=>{     // Simple Obj Convertor
    return JSON.parse(data.toString())
}

