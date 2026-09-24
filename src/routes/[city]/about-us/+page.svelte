<script>
    import info from '$lib/assets/pictures/Info.svg'
    import globe from '$lib/assets/pictures/Globe.svg'
    import handshake from '$lib/assets/pictures/Handshake.svg'
    import location from '$lib/assets/pictures/Location.svg'
</script>

<h1>About us</h1>
<details>
    <summary>
        <div class="logo-icon">
            <img src="{info}" alt="info logo">
        </div>
        
        <section>
            <h3>About this platform</h3>

            <p>
                This platform presents air quality measurements from Kumasi,
                Ghana, with a focus on making nitrogen dioxide (NO₂) data
                accessible and understandable for both residents and
                researchers...
            </p>
        </section>
    </summary>


    <section class="full-text">
        <p>
            This platform presents air quality measurements from Kumasi,
            Ghana, with a focus on making nitrogen dioxide (NO₂) data
            accessible and understandable for both residents and researchers.
            It brings together local ground-based measurements and satellite
            observations to show how air pollution varies across the city
            and over time. The platform is designed to support awareness,
            research, and informed decision-making around air quality in
            rapidly growing urban environments.
        </p>
    </section>
</details>

<details>
    <summary>
        <div class="logo-icon">
            <img src="{globe}" alt="Globe logo">
        </div>

        <section>
            <h3>Measuring air pollution at street level</h3>

            <p>
                Air pollution in African cities is often poorly documented, despite its major health impacts. To address this gap, a measurement network was set up across Kumasi...
            </p>
        </section>
    </summary>


    <section class="full-text">
        <p>
            Air pollution in African cities is often poorly documented, despite its major health impacts. To address this gap, a measurement network was set up across Kumasi using low-cost diffusion tubes that measure monthly average NO₂ concentrations. In 2025, measurements were carried out at 20 locations across the city, including traffic corridors, markets, residential areas, hospitals, and urban background sites. This approach captures spatial differences in exposure that are not visible in city-wide averages. The measurements show that air pollution levels can vary strongly within short distances, especially near busy roads and intersections.
        </p>
    </section>
</details>

<details>
    <summary>
        <div class="logo-icon">
            <img src="{handshake}" alt="Handshake logo">
        </div>

        <section>
            <h3>Local measurements, global context</h3>

            <p>
                Ground-based measurements are combined with satellite observations of NO₂, providing a broader view of air pollution at city scale. Satellite data helps place local measurements in...
            </p>
        </section>
    </summary>


    <section class="full-text">
        <p>
            Ground-based measurements are combined with satellite observations of NO₂, providing a broader view of air pollution at city scale. Satellite data helps place local measurements in a wider spatial and temporal context, while ground measurements are essential for validating and interpreting what satellites observe over African cities. Together, these data sources provide a more complete and reliable picture of air quality in Kumasi.
        </p>
    </section>
</details>

<details>
    <summary>
        <div class="logo-icon">
            <img src="{location}" alt="Location logo">
        </div>

        <section>
            <h3>Collaboration and local capacity</h3>

            <p>
                The platform is developed through a collaboration between Kwame Nkrumah University of Science and Technology (KNUST) and the Royal Netherlands Meteorological Institute (KNMI). KNUST plays a...
            </p>
        </section>
    </summary>


    <section class="full-text">
        <p>
            The platform is developed through a collaboration between Kwame Nkrumah University of Science and Technology (KNUST) and the Royal Netherlands Meteorological Institute (KNMI). KNUST plays a leading role in organising measurements, operating the local laboratory, and analysing the data within Ghana. KNMI supports the project with expertise in atmospheric science, satellite data, and interpretation of the results. This collaboration strengthens local capacity while ensuring scientific robustness.
        </p>
    </section>
</details>


<style>
    h1 {
        width: min(90%, 40.625rem);
        margin: 0 auto;
        padding: 1rem 1.25rem;
    }

    details {
        margin-right: auto;
        margin-left: auto;
        position: relative;
        border-radius: 1rem;
        width: min(90%, 40.625rem);
        padding: 1.25rem;
        background-color: var(--background-primary);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
        cursor: pointer;
        margin-bottom: 1rem;

        &:active {
            cursor: pointer;
        }

        summary {
            list-style: none;
            display: flex;
            align-items: center;

            .logo-icon {
                align-self: stretch;
                border-right: 3px solid #0087F1;
                flex: 0 0 60px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            section {
                min-width: 0;
                margin-left: 1rem;

                h3 {
                    font-weight: 600;
                    margin-bottom: 1rem;
                    transition: margin-bottom 250ms ease;
                }

                p {
                    max-height: 15rem;
                    transform: translateY(0);
                    overflow: hidden;
                    font-weight: 400;
                    opacity: 1;
                    text-wrap: balance;
                    transition: max-height 250ms ease, opacity 180ms ease, transform 250ms ease;
                }
            }
        }

        .full-text {
            display: grid;
            grid-template-rows: 0fr;
            opacity: 0;

            p {
                min-height: 0;
                overflow: hidden;
                font-weight: 400;
            }
        }

        &[open] {
            summary {
                section {
                    h3 {
                        margin-bottom: 0;
                    }

                    p {
                        max-height: 0;
                        opacity: 0;
                    }
                }
            }

            .full-text {
                grid-template-rows: 1fr;
                opacity: 1;
                animation-name: details-show 150ms ease-in-out;

                p {
                    padding-top: 1rem;
                    font-weight: 400;
                }
            }
        }
    }

    @keyframes details-show {
        from {
            opacity: 0;
            transform: translateY(-0.5rem);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>