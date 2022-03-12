const router = require("express").Router(),
  {
    index,
    show,
    store,
    update,
    remove,
  } = require("../controllers/invoiceController");

router.get("/", index);

router.get("/:date?/:size?/:page?", show);

router.post("/", store);

router.delete("/:invoice_no", remove);

router.put("/:invoice_no", update);

module.exports = router;
