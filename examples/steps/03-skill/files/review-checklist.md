# API change review checklist

- Is the approved contract authoritative rather than the ambiguous draft?
- Are health/list/get routes and the archived four-user fixture unchanged?
- Does search route before get-by-ID and match only trimmed case-insensitive fullName substrings?
- Do omitted/blank q match all and no matches return an empty array with total zero?
- Are singleton q/limit enforced, including duplicate blank q values?
- Are valid limits 1–25 only, with default 10 and no sign/whitespace/decimal/exponent/leading zeros?
- Are matches sorted by ordinal ID before slicing, with total computed before limiting?
- Does `q=lee&limit=1` return u-001 and total 3, not total 1?
- Are response status, shape and content type exact?
- Are fixtures immutable, results repeatable, isolated servers closed, and logs limited to route/status?
- Are focused regression/full acceptance commands actually run and their exits reported?
- Was implementation approved, scope preserved and package/client evidence distinguished from assertions?
