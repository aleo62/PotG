export const Background = () => {
    return (
        <div className="fixed top-0 inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
            <div className="absolute top-0 right-0 bottom-0 left-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
            <div className="absolute top-0 right-0 bottom-0 left-0 bg-[radial-gradient(circle_800px_at_0%_100%,#f0e68c,transparent)]"></div>
        </div>
    );
};
