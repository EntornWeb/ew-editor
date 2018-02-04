export default function(tx) {
    let body = tx.create({id: 'body', type: 'body'});
    tx.create({
        id: 'p1',
        type: 'paragraph',
        content: ""
    });
    body.show('p1');
}
