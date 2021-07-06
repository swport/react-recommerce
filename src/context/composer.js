export default function Composer(props) {
    const { components = [], children } = props;

    return (
        <>
            {components.reduceRight((acc, Comp) => {
                return <Comp>{acc}</Comp>
            }, children)}
        </>
    )
}