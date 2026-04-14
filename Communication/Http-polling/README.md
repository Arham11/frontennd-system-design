# Long Polling Quick Test Checklist

Use this checklist to verify long polling behavior.

## Start Server

- Run: `npm run start-lp`
- Expected log: `Example app listening on port 5111`

## Functional Checks

- Open `http://localhost:5111/` in a browser.
- Confirm page heading shows `Long Polling`.

## API Checklist (curl)

- Reject empty update payload:

```bash
curl -i "http://localhost:5111/updateData"
```

Expected: `HTTP/1.1 400` with JSON error.

- Prime a known value:

```bash
curl "http://localhost:5111/updateData?data=Initial%20Data"
```

Expected: success JSON.

- Start a waiting long-poll request in terminal A:

```bash
curl -i "http://localhost:5111/getData?lastData=Initial%20Data"
```

Expected: request stays pending.

- Trigger update in terminal B:

```bash
curl "http://localhost:5111/updateData?data=Fresh%20Data"
```

Expected:
- Terminal B returns success JSON immediately.
- Terminal A returns `{"data":"Fresh Data"}` after update.

## Regression Check

- Call:

```bash
curl "http://localhost:5111/getData?lastData=Fresh%20Data"
```

Expected: request stays pending again until next update.
